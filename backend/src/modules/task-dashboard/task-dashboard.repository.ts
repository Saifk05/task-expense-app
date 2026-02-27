import { PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const taskDashboardRepository = {
  async getUserFirstName(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { firstName: true }
    });
  },

  async getTotalTasks(userId: string, from: Date, to: Date) {
    return prisma.task.count({
      where: {
        userId,
        createdAt: {
          gte: from,
          lte: to
        }
      }
    });
  },

  async getStatusBreakdown(userId: string, from: Date, to: Date) {
    return prisma.task.groupBy({
      by: ["status"],
      where: {
        userId,
        createdAt: {
          gte: from,
          lte: to
        }
      },
      _count: {
        status: true
      }
    });
  },

  async getOverdueTasks(userId: string, from: Date, to: Date) {
    const now = new Date();

    return prisma.task.count({
      where: {
        userId,
        createdAt: {
          gte: from,
          lte: to
        },
        dueDate: {
          lt: now
        },
        status: {
          notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED]
        }
      }
    });
  },

  async getDailyActivity(userId: string, from: Date, to: Date) {
    return prisma.$queryRaw<
      { date: string; count: bigint }[]
    >`
      SELECT DATE("createdAt") as date,
             COUNT(*) as count
      FROM "Task"
      WHERE "userId" = ${userId}
        AND "createdAt" BETWEEN ${from} AND ${to}
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt") ASC
    `;
  }
};