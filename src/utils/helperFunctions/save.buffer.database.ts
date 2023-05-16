import Image from "../../model/image.model";
import { Buffer } from "buffer";

export const saveBufferDatabase = async (
  id: string,
  format: string,
  link: string,
  size: number,
  dimension: string,
  use: string,
  field: string,
  original: string,
  mime: string,
  data: Uint8Array
): Promise<void> => {
  try {
    const newImage = new Image({
      imageId: id,
      imageFormat: format,
      imageLink: link,
      imageSize: size,
      imageDimension:`${dimension}`,
      use: use,
      fieldname: field,
      originalname: original,
      mimetype: mime,
      data: data,
    });

    await newImage.save();
  } catch (error) {
    console.error(error);
    throw new Error("Error saving image to database");
  }
};
