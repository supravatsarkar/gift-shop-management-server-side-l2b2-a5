import httpStatus from "../../constants/httpStatus";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const getMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "success",
    data: user,
  });
});
const updateUserProfile = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const response = await userService.updateUserProfile(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User data updated successfully!",
    data: response,
  });
});
const getMangers = catchAsync(async (req, res, next) => {
  const { limit, page } = req.query;
  const data = await userService.findUsersByFilter({
    filter: {
      role: "manager",
    },
    limit: Number(limit || 10),
    page: Number(page || 1),
  });
  // console.log({ managers });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    data: data,
  });
});
const getCustomers = catchAsync(async (req, res, next) => {
  const { limit, page } = req.query;
  const customers = await userService.findUsersByFilter({
    filter: {
      role: "customer",
    },
    limit: Number(limit || 10),
    page: Number(page || 1),
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    data: customers,
  });
});
const getDashboardSummary = catchAsync(async (req, res, next) => {
  const customers = await userService.getDashboardSummary();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    data: customers,
  });
});

export const userController = {
  getMe,
  updateUserProfile,
  getMangers,
  getCustomers,
  getDashboardSummary,
};
