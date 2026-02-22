import { Router } from "express";
import AuthController from "./auth.controller";
import validate from "../../lib/middleware/validate.middleware";
import { registerSchema, loginSchema, updateProfileSchema } from "./auth.validation";
import authMiddleware from "../../lib/middleware/auth.middleware";
import upload from "../../lib/middleware/upload.middleware";

const router = Router();

router.post( "/auth/register", validate(registerSchema), AuthController.register );

router.post( "/auth/login", validate(loginSchema), AuthController.login );

router.post("/auth/refresh", AuthController.refreshToken);

router.post("/auth/logout", authMiddleware, AuthController.logout);

router.patch("/users/profile", authMiddleware, validate(updateProfileSchema), AuthController.updateProfile );

router.post( "/auth/upload-profile", authMiddleware, upload.single("image"), AuthController.uploadProfileImage );

router.get("/users/me", authMiddleware, AuthController.getCurrentUser );
export default router;
