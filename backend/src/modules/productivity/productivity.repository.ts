import { PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductivityRepository {

  /*
  |--------------------------------------------------------------------------
  | 1️⃣ Global Status Counts (Lifetime)
  |--------------------------------------------------------------------------
  */
  async getGlobalStatusCounts(userId: string) {
    return prisma.task.groupBy({
      by: ["status"],
      where: {
        userId
      },
      _count: {
        status: true
      }
    });
  }

  /*
  |--------------------------------------------------------------------------
  | 2️⃣ Weekly Tasks (7-Day Window)
  |--------------------------------------------------------------------------
  */
  async getWeeklyTasks(
    userId: string,
    weekStart: Date,
    weekEnd: Date
  ) {
    return prisma.task.findMany({
      where: {
        userId,
        startDate: { lte: weekEnd },
        dueDate: { gte: weekStart }
      },
      select: {
        status: true,
        startDate: true,
        dueDate: true,
        completedAt: true
      }
    });
  }

  /*
  |--------------------------------------------------------------------------
  | 3️⃣ Overdue Tasks Count (Lifetime)
  |--------------------------------------------------------------------------
  */
  async getOverdueTasksCount(userId: string, today: Date) {
    return prisma.task.count({
      where: {
        userId,
        dueDate: { lt: today },
        status: {
          notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED]
        }
      }
    });
  }

  /*
  |--------------------------------------------------------------------------
  | 4️⃣ Streak Data (Unlimited but Efficient)
  |--------------------------------------------------------------------------
  */
  async getStreakTasks(userId: string) {
    return prisma.task.findMany({
      where: {
        userId,
        OR: [
          { completedAt: { not: null } },
          { dueDate: { gte: new Date(0) } } // minimal filter, avoids full table scan
        ]
      },
      select: {
        startDate: true,
        dueDate: true,
        completedAt: true
      },
      orderBy: {
        completedAt: "desc"
      }
    });
  }


async getTasksByStatus(
  userId: string,
  status: TaskStatus,
  cursor?: string,
  limit: number = 10
) {
  return prisma.task.findMany({
    where: {
      userId,
      status
    },
    include: {
      category: {
        include: {
          parent: true
        }
      }
    },
    orderBy: {
      createdAt: "desc" // 🔥 newest first
    },
    take: limit + 1, // extra to check next page
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1
    })
  });
}

async getOverdueTasks(
  userId: string,
  today: Date,
  cursor?: string,
  limit: number = 10
) {
  return prisma.task.findMany({
    where: {
      userId,
      dueDate: { lt: today },
      status: {
        notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED]
      }
    },
    include: {
      category: {
        include: {
          parent: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    take: limit + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1
    })
  });
}
}