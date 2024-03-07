import httpStatus from "../../constants/httpStatus";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const getMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "success",
    data: user,
  });
});

export const userController = { getMe };
