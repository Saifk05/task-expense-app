import { NotificationRepository } from "./notification.repository";

export class NotificationService {
  private notificationRepository = new NotificationRepository();

  /**
   * Cursor-based pagination
   */
  async getNotifications(
    userId: string,
    cursor: string | null,
    limit = 10
  ) {
    const notifications =
      await this.notificationRepository.findAllByUser(
        userId,
        cursor,
        limit
      );

    let nextCursor: string | null = null;
    let hasMore = false;

    if (notifications.length > limit) {
      hasMore = true;
      const nextItem = notifications.pop();
      nextCursor = nextItem?.id ?? null;
    }

    return {
      notifications,
      nextCursor,
      hasMore,
    };
  }

  async getUnreadCount(userId: string) {
    return this.notificationRepository.countUnread(
      userId
    );
  }

  async markNotificationAsRead(
    notificationId: string,
    userId: string
  ) {
    return this.notificationRepository.markAsRead(
      notificationId,
      userId
    );
  }

  async markAllAsRead(userId: string) {
    return this.notificationRepository.markAllAsRead(
      userId
    );
  }

  async deleteNotification(
    notificationId: string,
    userId: string
  ) {
    const result =
      await this.notificationRepository.deleteById(
        notificationId,
        userId
      );

    if (result.count === 0) {
      throw new Error("Notification not found");
    }

    return true;
  }
}