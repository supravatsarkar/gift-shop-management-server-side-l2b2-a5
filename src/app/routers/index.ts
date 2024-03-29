import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";
import { userRouter } from "../modules/user/user.routes";
import { productRouter } from "../modules/product/product.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);

export default router;
