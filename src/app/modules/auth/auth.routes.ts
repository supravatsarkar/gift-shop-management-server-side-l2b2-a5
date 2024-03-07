import { Router } from "express";
import { authValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
const router = Router();

router.post(
  "/register",
  validateRequest(authValidation.userRegisterSchema),
  authController.registerUser
);
router.post(
  "/login",
  validateRequest(authValidation.loginSchema),
  authController.login
);
router.post(
  "/renew-access-token",
  validateRequest(authValidation.renewAccessTokenSchema),
  authController.renewAccessToken
);

export const authRouter = router;
