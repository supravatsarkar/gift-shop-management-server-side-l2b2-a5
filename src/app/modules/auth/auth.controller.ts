import { Request, RequestHandler, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";
import { userService } from "../user/user.service";
import { TUser } from "../user/user.interface";
import httpStatus from "../../constants/httpStatus";

const registerUser = catchAsync(async (req, res, next) => {
  const body = req.body;
  const user = await userService.createUser(body);
  sendResponse<TUser>(res, {
    statusCode: httpStatus.CREATED,
    message: "User registered successfully!",
    data: user,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  console.log("run....");

  next(new AppError(400, "Invalid params"));
  return;
  sendResponse<Record<string, unknown>>(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "success",
    data: {},
  });
});

export default {
  registerUser,
  getMe,
};
