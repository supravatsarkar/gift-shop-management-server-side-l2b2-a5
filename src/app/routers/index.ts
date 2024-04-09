import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";
import { userRouter } from "../modules/user/user.routes";
import { productRouter } from "../modules/product/product.routes";
import { salesRouter } from "../modules/sale/sale.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/sale", salesRouter);

export default router;
