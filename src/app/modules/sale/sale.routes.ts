import { Router } from "express";
import { saleValidation } from "./sale.validation";
import validateRequest from "../../middlewares/validateRequest";
import { saleController } from "./sale.controller";
const router = Router();
router.post(
  "/mark-as-sale/:productId",
  validateRequest(saleValidation.markAsSell),
  saleController.markAsSell
);
router.get(
  "/view-sales-history",
  validateRequest(saleValidation.viewSalesHistory),
  saleController.viewSalesHistory
);

export const salesRouter = router;
