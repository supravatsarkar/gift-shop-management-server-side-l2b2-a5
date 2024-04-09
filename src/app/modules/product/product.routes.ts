import { Router } from "express";
import { productController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productValidation } from "./product.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-product",
  auth("admin", "manager"),
  validateRequest(productValidation.createProductValidationSchema),
  productController.createProduct
);
router.put(
  "/update-product/:id",
  auth("admin", "manager"),
  validateRequest(productValidation.updateProductValidationSchema),
  productController.updateProductById
);
router.post(
  "/create-bulk-product",
  auth("admin", "manager"),
  validateRequest(productValidation.createBulkProductValidationSchema),
  productController.createBulkProduct
);
router.delete(
  "/delete-product/:id",
  auth("admin", "manager"),
  productController.deleteProduct
);
router.delete(
  "/delete-bulk-product",
  auth("admin", "manager"),
  validateRequest(productValidation.deleteBulkProductByIdValidationSchema),
  productController.deleteBulkProduct
);
router.post(
  "/restore-product/:id",
  auth("admin", "manager"),
  productController.restoreProduct
);
router.get(
  "/get-all-active-products",
  productController.getAllActiveProductByFilter
);
router.get("/get-all-products", productController.getAllProductByFilter);
router.get("/get-inventory", productController.getInventory);

export const productRouter = router;
