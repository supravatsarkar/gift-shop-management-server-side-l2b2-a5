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
const getMangers = catchAsync(async (req, res, next) => {
  const managers = await userService.findUsersByFilter({ role: "manager" });
  console.log({ managers });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    data: managers,
  });
});
const getCustomers = catchAsync(async (req, res, next) => {
  const customers = await userService.findUsersByFilter({ role: "customer" });
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
  getMangers,
  getCustomers,
  getDashboardSummary,
};
