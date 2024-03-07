import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import authController from "./auth.controller";
import { userRegisterSchema } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = Router();

router.post(
  "/register",
  validateRequest(userRegisterSchema),
  authController.registerUser
);
router.get("/get-me", authController.getMe);

export const authRouter = router;
