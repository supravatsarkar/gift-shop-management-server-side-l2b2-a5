import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";

const router = Router();

router.use(
  "/auth",
  (req, res, next) => {
    next();
  },
  authRouter
);

export default router;
