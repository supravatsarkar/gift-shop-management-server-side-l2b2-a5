import { Request, RequestHandler, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const registerUser = catchAsync(async (req, res, next) => {
  console.log("Registration Controller");
  sendResponse<Record<string, unknown>>(res, {
    success: true,
    statusCode: 200,
    message: "success",
    data: {},
  });
});
const getMe = (req: Request, res: Response) => {
  console.log("Get me Controller");
  res.send("Get me success");
};

export default {
  registerUser,
  getMe,
};
