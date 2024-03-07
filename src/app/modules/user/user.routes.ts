import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { roles } from "../../constants";
import { TRoles } from "../../interface/types";

const router = Router();

router.get(
  "/me",
  auth("master-admin", "admin", "manager", "customer"),
  userController.getMe
);

export const userRouter = router;
