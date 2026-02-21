import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import taskRoutes from "../modules/tasks/task.routes";
const router = Router();

router.get("/ping", (_req, res) => {
  res.json({ message: "API working" });
});

router.use(authRoutes);
router.use(taskRoutes);

export default router;
