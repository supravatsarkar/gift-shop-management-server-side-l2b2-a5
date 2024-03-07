import { Request, RequestHandler, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import httpStatus from "../../constants/httpStatus";
import { authService } from "./auth.service";

const registerUser = catchAsync(async (req, res, next) => {
  const body = req.body;
  console.log("register user controller=>", body);
  const user = await authService.createUser(body);
  sendResponse<Partial<TUser>>(res, {
    statusCode: httpStatus.CREATED,
    message: "User registered successfully!",
    data: user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, phone, password } = req.body;
  const response = await authService.login(email, phone, password);
  sendResponse<Record<string, unknown>>(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "success",
    data: response,
  });
});
const renewAccessToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;
  const data = await authService.renewAccessToken(refreshToken);
  sendResponse<Record<string, unknown>>(res, {
    data: data,
  });
});

export const authController = {
  registerUser,
  login,
  renewAccessToken,
};
