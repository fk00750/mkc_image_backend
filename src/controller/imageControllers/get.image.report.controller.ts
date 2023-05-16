import Image from "../../model/image.model";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";


const getImageReport: RouteParamsHandler = async (req, res, next) => {
  try {
    // Get all images from the database
    const images = await Image.find({});

    // Format the data to send as a response
    const formattedData = images.map((image) => ({
      id: image.imageId,
      format: image.imageFormat,
      link: image.imageLink,
      dimension:image.imageDimension,
      size: image.imageSize,
      use: image.use,
      fieldname: image.fieldname,
      originalname: image.originalname,
      mimetype: image.mimetype,
      date: image.date,
    }));

    // Send the formatted data as a response
    res.status(200).json(formattedData);
  } catch (error) {
    next(CustomErrorHandler.serverError());
  }
};

export default getImageReport;
