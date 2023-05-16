import { Schema, model } from "mongoose";

// Define a schema for the images collection
const imageSchema = new Schema({
  imageId: {
    type: String,
    required: true,
  },
  imageFormat: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  imageSize: {
    type: Number,
    required: true,
  },
  imageDimension:{
    type: String,
    required: true,
  },
  use: {
    type: String,
    required: true,
  },
  fieldname: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

const Image = model("images", imageSchema);

export default Image;
