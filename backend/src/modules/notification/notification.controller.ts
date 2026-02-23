import { Response, NextFunction } from "express";
import { AuthRequest } from "../../lib/middleware/auth.middleware";
import { NotificationService } from "./notification.service";

export class NotificationController {
  private notificationService = new NotificationService();

  /**
   * GET /notifications
   * Cursor-based pagination
   * ?cursor=<notificationId>&limit=10
   */
  getNotifications = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const cursor =
        typeof req.query.cursor === "string"
          ? req.query.cursor
          : null;

      const limit = Number(req.query.limit) || 10;

      const data =
        await this.notificationService.getNotifications(
          req.user.userId,
          cursor,
          limit
        );

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /notifications/unread-count
   */
  getUnreadCount = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const count =
        await this.notificationService.getUnreadCount(
          req.user.userId
        );

      return res.status(200).json({
        success: true,
        data: { count },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * PATCH /notifications/:id/read
   */
  markAsRead = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const notificationId = req.params.id;

      if (!notificationId || Array.isArray(notificationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid notification id",
        });
      }

      await this.notificationService.markNotificationAsRead(
        notificationId,
        req.user.userId
      );

      return res.status(200).json({
        success: true,
        message: "Notification marked as read",
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /notifications/:id
   */
  deleteNotification = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const notificationId = req.params.id;

      if (!notificationId || Array.isArray(notificationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid notification id",
        });
      }

      await this.notificationService.deleteNotification(
        notificationId,
        req.user.userId
      );

      return res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
      });
    } catch (error: any) {
      if (error.message === "Notification not found") {
        return res.status(404).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  };

  /**
   * PATCH /notifications/read-all
   */
  markAllAsRead = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      await this.notificationService.markAllAsRead(
        req.user.userId
      );

      return res.status(200).json({
        success: true,
        message: "All notifications marked as read",
      });
    } catch (error) {
      next(error);
    }
  };
}