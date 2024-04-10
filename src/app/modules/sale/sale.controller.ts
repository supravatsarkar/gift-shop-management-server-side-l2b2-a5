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
const viewSalesHistory = catchAsync(async (req, res) => {
  const { category, year } = req.query;
  const data = await saleService.viewSalesHistory(
    category as string,
    year as string
  );
  sendResponse(res, {
    success: true,
    data,
    statusCode: httpStatus.OK,
  });
});

export const saleController = {
  markAsSell,
  viewSalesHistory,
};
