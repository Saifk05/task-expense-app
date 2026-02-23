import { prisma } from "../../config/prisma";

export class NotificationRepository {


async findAllByUser(
  userId: string,
  cursor: string | null,
  take: number
) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: take + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });
}


async createNotification(data: {
  userId: string;
  title: string;
  message: string;
  type: any;
  relatedTaskId?: string;
}) {
  return prisma.notification.create({
    data: {
      userId: data.userId,
      title: data.title,
      message: data.message,
      type: data.type,
      relatedTaskId: data.relatedTaskId,
      isSent: true,
      sentAt: new Date(),
    },
  });
}

  async countUnread(userId: string) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  async markAsRead(notificationId: string, userId: string) {
    return prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }


  async deleteById(notificationId: string, userId: string) {
  return prisma.notification.deleteMany({
    where: {
      id: notificationId,
      userId, // ensures user can delete only their own
    },
  });
}

}