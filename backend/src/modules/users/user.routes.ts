import { Router } from "express";
import authMiddleware from "../../lib/middleware/auth.middleware";
import { UserController } from "./user.controller";

const router = Router();
const userController = new UserController();


router.get( "/user/overview",  authMiddleware, userController.getOverview );
router.put("/user/address",  authMiddleware,  userController.updateAddress );
router.patch("/user/mfa", authMiddleware, userController.toggleMfa);

router.post(
  "/user/address/search",
  authMiddleware,
  userController.searchLocation
);

router.get(
  "/user/address/reverse",
  authMiddleware,
  userController.reverseGeocode
);


router.get(
  "/user/address",
  authMiddleware,
  userController.getAddress
);

router.patch(
  "/user/change-password",
  authMiddleware,
  userController.changePassword
);

export default router;