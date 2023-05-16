// import { PDFDocument } from "pdf-lib";
import PDFDocument from "pdfkit";

import sharp from "sharp";
import Image from "../../model/image.model";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";

/**
 * Retrieves the requested image from the database and sends it to the client as a response.
 * @async
 * @function
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The Express next middleware function.
 * @throws {CustomErrorHandler} Will throw a custom error handler if the requested image is not found in the database.
 * @returns {undefined} This function does not return anything, but sends the image buffer as a response to the client.
 */
const getImage: RouteParamsHandler = async (req, res, next) => {
  try {
    let contentType;

    const imageName = req.params.image;

    const imageId = imageName.split(".")[0];

    // Find Image in database
    const imageData = await Image.findOne({ imageId });

    if (!imageData) return next(CustomErrorHandler.notFound("Image not found"));

    const imageFormat = imageData.imageFormat;
    const imageBuffer = imageData.data;
    const sharpImage = sharp(imageBuffer);
    const metadata = await sharpImage.metadata();
    const imageWidth = metadata.width;
    const imageHeight = metadata.height;

    if (imageFormat === "pdf") {
      // Embed image in a new PDF document
      contentType = "application/pdf";

      try {
        const contentType = "application/pdf";

        // Create a new PDF document
        const pdfDoc = new PDFDocument({
          size: [imageWidth || 612, imageHeight || 792],
        });

        // Add a blank page
        // pdfDoc.addPage();

        // Embed the image in the PDF document
        pdfDoc.image(imageBuffer, 0, 0, {
          width: imageWidth,
          height: imageHeight,
        });

        // Generate the PDF document
        const pdfBytes = await new Promise<Buffer>((resolve, reject) => {
          const chunks: Uint8Array[] = [];
          pdfDoc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
          pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
          pdfDoc.end();
        });

        // Send the PDF document in the response
        res.set("Content-Type", contentType);
        res.send(pdfBytes);
      } catch (error) {
        console.error("Error creating PDF:", error);
        next(error);
      }
    } else {
      contentType = `image/${imageFormat}`;

      res.set("Content-Type", contentType);
      res.send(imageBuffer);
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export default getImage;
