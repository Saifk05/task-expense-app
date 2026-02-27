import express from "express";
import authMiddleware from "../../lib/middleware/auth.middleware";
import { taskDashboardQuerySchema } from "./task-dashboard.schema";
import { getTaskDashboardController } from "./task-dashboard.controller";

const router = express.Router();

router.get(
  "/task/dashboard",
  authMiddleware,
//   validateQuery(taskDashboardQuerySchema),
  getTaskDashboardController
);

export default router;