import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import taskRoutes from "../modules/tasks/task.routes";
import userRoutes from "../modules/users/user.routes";
import notificationRoutes from "../modules/notification/notification.routes"; 

const router = Router();

router.get("/ping", (_req, res) => {
  res.json({ message: "API working" });
});

router.use(authRoutes);
router.use(taskRoutes);
router.use(userRoutes); 
router.use(notificationRoutes);
export default router;
