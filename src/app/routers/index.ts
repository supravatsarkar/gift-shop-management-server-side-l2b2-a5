import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";

const router = Router();

router.use(
  "/auth",
  (req, res, next) => {
    console.log("Running under router");
    next();
  },
  authRouter
);

export default router;
