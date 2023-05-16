import sharp from "sharp";
import Image from "../../model/image.model";
import RouteParamsHandler from "../../types/routeParams.type";
import { generateImageId } from "../../utils/helperFunctions/generate.id";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { saveBufferDatabase } from "../../utils/helperFunctions/save.buffer.database";

/**
 * @async
 * @function uploadImage - Uploads an image file to the server and saves it to the database.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 * @throws {Error} Will throw an error if there is a problem saving the image to the database.
 * @returns {object} Returns a JSON object with a success message and the image link.
 */
const uploadImage: RouteParamsHandler = async (req, res, next) => {
  try {
    let sharpInstance;
    let ratio;
    let sizeInKb;

    // Get the intended use of the image from the request body
    const useOfImage = req.body.use;

    // Get the file details from the multer file object
    const { fieldname, originalname, mimetype, buffer } =
      req.file as Express.Multer.File;

    // get image format from buffer metadata
    const metadata = await sharp(buffer).metadata();
    const imageFormat = metadata.format as string;

    // generate image id
    const imageId = await generateImageId();

    // get requested format
    let requestedFormat = req.body.format || imageFormat;

    // create sharp instance
    sharpInstance = sharp(buffer);

    // apply dynamic compression
    const { width, height, size } = await sharpInstance.metadata();

    if (width && height) {
      ratio = width / height;
    } else {
      // if width is undefined, use a default aspect ratio
      ratio = 4 / 3;
    }

    const maxFileSize = 500000;

    // check if the image size is greater than the maximum allowed size
    if (size! > maxFileSize) {
      sharpInstance = sharpInstance.resize({
        width: 1000,
        height: Math.round(1000 / ratio),
      });
    }


    // convert image to buffer
    const { data: compressedBuffer } = await sharpInstance.toBuffer({
      resolveWithObject: true,
    });

    // get the size of the compressed buffer
    const newSize = Buffer.byteLength(compressedBuffer);

    // generate link
    const imageLink = `${req.protocol}://${req.headers.host}/v1/images/get-image/${imageId}.${requestedFormat}`;

    // convert to requested format if specified
    if (requestedFormat) {
      if (requestedFormat === "pdf") {
        sharpInstance.toFormat("png");
      } else {
        sharpInstance.toFormat(requestedFormat);
      }

      // Get the dimensions of the image
      const { width, height } = await sharpInstance.metadata();
      const imageDimension = `${width}x${height}`;

      await saveBufferDatabase(
        imageId,
        requestedFormat,
        imageLink,
        newSize,
        imageDimension,
        useOfImage,
        fieldname,
        originalname,
        mimetype,
        await sharpInstance.toBuffer()
      );

      // calculate the size of the image in kilobytes
      sizeInKb = Math.round(newSize! / 1024);

      res.status(200).json({
        message: "Image uploaded successfully",
        imageLink,
        sizeInKb,
      });
    }
  } catch (error) {
    next(error);
  }
};

export default uploadImage;
