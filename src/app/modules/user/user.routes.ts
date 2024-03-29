import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { roles } from "../../constants";
import { TRoles } from "../../interface/types";

const router = Router();

router.get("/me", auth("admin", "manager", "customer"), userController.getMe);
router.get("/get-managers", auth("admin"), userController.getMangers);
router.get(
  "/get-customers",
  auth("admin", "manager"),
  userController.getCustomers
);

export const userRouter = router;
