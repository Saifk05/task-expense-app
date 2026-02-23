import { Router } from "express";
import authMiddleware from "../../lib/middleware/auth.middleware";
import { NotificationController } from "./notification.controller";

const router = Router();
const controller = new NotificationController();

router.get(
  "/notifications",
  authMiddleware,
  controller.getNotifications
);

router.get(
  "/notifications/unread-count",
  authMiddleware,
  controller.getUnreadCount
);

router.patch(
  "/notifications/:id/read",
  authMiddleware,
  controller.markAsRead
);

router.patch(
  "/notifications/read-all",
  authMiddleware,
  controller.markAllAsRead
);


router.delete(
  "/notifications/:id",
  authMiddleware,
  controller.deleteNotification
);

export default router;