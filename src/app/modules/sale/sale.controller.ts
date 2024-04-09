import httpStatus from "../../constants/httpStatus";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { saleService } from "./sale.service";

const markAsSell = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const data = await saleService.markAsSell(productId, req.body);
  sendResponse(res, {
    success: true,
    data,
    statusCode: httpStatus.CREATED,
  });
});

export const saleController = {
  markAsSell,
};
