import { Router } from "express";
import { ProductivityController } from "./productivity.controller";
import authMiddleware from "../../lib/middleware/auth.middleware";

const router = Router();
const controller = new ProductivityController();

/*
|--------------------------------------------------------------------------
| Productivity Summary
|--------------------------------------------------------------------------
*/
router.get(
  "/productivity/summary",
  authMiddleware,
  controller.getProductivitySummary
);
router.get(
  "/productivity/tasks/pending",
  authMiddleware,
  controller.getPendingTasks
);

router.get(
  "/productivity/tasks/overdue",
  authMiddleware,
  controller.getOverdueTasks
);

router.get(
  "/productivity/tasks/completed",
  authMiddleware,
  controller.getCompletedTasks
);

router.get(
  "/productivity/tasks/cancelled",
  authMiddleware,
  controller.getCancelledTasks
);

router.get(
  "/productivity/tasks/in-progress",
  authMiddleware,
  controller.getInProgressTasks
);

export default router;