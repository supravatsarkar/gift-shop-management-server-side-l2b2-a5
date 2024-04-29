import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { roles } from "../../constants";
import { TRoles } from "../../interface/types";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.get("/me", auth("admin", "manager", "customer"), userController.getMe);
router.put(
  "/update-user-profile/:id",
  auth("admin"),
  validateRequest(UserValidation.userProfileUpdateSchema),
  userController.updateUserProfile
);
router.get("/get-managers", auth("admin"), userController.getMangers);
router.get(
  "/get-customers",
  auth("admin", "manager"),
  userController.getCustomers
);
router.get(
  "/get-dashboard-summery",
  auth("admin", "manager"),
  userController.getDashboardSummary
);

export const userRouter = router;
