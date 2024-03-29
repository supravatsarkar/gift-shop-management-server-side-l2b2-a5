import httpStatus from "../../constants/httpStatus";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const data = await productService.createProduct(req.body);
  sendResponse(res, {
    success: true,
    data,
    message: "Product created successfully!",
    statusCode: httpStatus.CREATED,
  });
});
const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await productService.deleteProductById(id);
  sendResponse(res, {
    success: true,
    data,
    message: "Product deleted successfully!",
    statusCode: httpStatus.OK,
  });
});
const restoreProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await productService.restoreProductById(id);
  sendResponse(res, {
    success: true,
    data,
    message: "Product restored successfully!",
    statusCode: httpStatus.OK,
  });
});
const deleteBulkProduct = catchAsync(async (req, res) => {
  const ids = req.body.ids;
  const data = await productService.deleteBulkProductByIds(ids);
  sendResponse(res, {
    success: true,
    data,
    message: "Products deleted successfully!",
    statusCode: httpStatus.OK,
  });
});
const createBulkProduct = catchAsync(async (req, res) => {
  const data = await productService.createBulkProduct(req.body);
  sendResponse(res, {
    success: true,
    data,
    message: "Products created successfully!",
    statusCode: httpStatus.CREATED,
  });
});
const getAllActiveProductByFilter = catchAsync(async (req, res) => {
  const data = await productService.getAllActiveProductByFilter(
    req.query as any
  );
  sendResponse(res, {
    success: true,
    data,
    message: "Products retrieve successfully!",
    statusCode: httpStatus.OK,
  });
});
const getAllProductByFilter = catchAsync(async (req, res) => {
  const data = await productService.getAllProductByFilter(req.query as any);
  sendResponse(res, {
    success: true,
    data,
    message: "Products retrieve successfully!",
    statusCode: httpStatus.OK,
  });
});

export const productController = {
  createProduct,
  createBulkProduct,
  deleteProduct,
  deleteBulkProduct,
  restoreProduct,
  getAllActiveProductByFilter,
  getAllProductByFilter,
};
