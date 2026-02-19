import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.get("/ping", (_req, res) => {
  res.json({ message: "API working" });
});

router.use(authRoutes);

export default router;
