import type { ErrorRequestHandler } from "express";
import multer from "multer";
import CustomErrorHandler from "../utils/ErrorHandler/custom.errorHandler";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data: object;

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      errorMessage: err.message,
    };
  } else if (err instanceof multer.MulterError) {
    statusCode = parseInt(err.code);
    data = {
      errorMessage: err.message,
    };
  } else {
    data = {
      message: "Internal Server Error",
      errorMessage: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
