import { ErrorRequestHandler, RequestHandler } from "express";
import AppError from "../errors/AppError";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = "Something Went Wrong!";
  let statusCode = 500;

  if (error instanceof AppError) {
    message = error.message;
    statusCode = statusCode || 400;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    stack: config.NODE_ENV === "development" ? error?.stack : "",
  });
};

export default globalErrorHandler;
