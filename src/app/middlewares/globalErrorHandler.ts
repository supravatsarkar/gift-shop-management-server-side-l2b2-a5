import { ErrorRequestHandler, RequestHandler } from "express";
import AppError from "../errors/AppError";
import config from "../config";
import { ZodError } from "zod";
import { TErrorDetails } from "../interface/types";
import zodErrorParse from "../errors/zodError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log("GlobalError=>", error);
  let message = "Something Went Wrong!";
  let statusCode = 500;
  let errorDetails: TErrorDetails[] = [
    {
      message: "",
      path: "",
    },
  ];

  if (error instanceof AppError) {
    message = error.message;
    statusCode = error.statusCode || 400;
  }
  if (error instanceof ZodError) {
    message = "Some parameter missing";
    statusCode = 400;
    errorDetails = zodErrorParse(error);
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorDetails,
    stack: config.NODE_ENV === "development" ? error?.stack : "",
  });
};

export default globalErrorHandler;
