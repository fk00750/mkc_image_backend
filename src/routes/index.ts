import express from "express";
import { getImage, getImageReport, uploadImage } from "../controller";
import { upload } from "../middleware/image.multer";

const ImageRouter = express.Router();

ImageRouter.post("/upload-image", upload.single("image"), uploadImage)
  .get("/get-image/:image", getImage)
  .get("/get-image-report", getImageReport);

export default ImageRouter;
