import { TaskStatus } from "@prisma/client";
import { ProductivityRepository } from "./productivity.repository";

export class ProductivityService {
  private repository: ProductivityRepository;

  constructor() {
    this.repository = new ProductivityRepository();
  }

  async getProductivitySummary(userId: string) {
    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59, 999));

    // Week window (Monday → Sunday)
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
    const diffToMonday = (dayOfWeek + 6) % 7;

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    // Run queries in parallel
    const [
      statusCounts,
      weeklyTasks,
      overdueTasksCount,
      streakTasks
    ] = await Promise.all([
      this.repository.getGlobalStatusCounts(userId),
      this.repository.getWeeklyTasks(userId, weekStart, weekEnd),
      this.repository.getOverdueTasksCount(userId, todayStart),
      this.repository.getStreakTasks(userId)
    ]);

    /*
    |--------------------------------------------------------------------------
    | GLOBAL COUNTS
    |--------------------------------------------------------------------------
    */

    let totalTasks = 0;
    let completedTasks = 0;
    let inProgressTasks = 0;
    let pendingCount = 0;
    let cancelledCount = 0;

     statusCounts.forEach((item) => {
     totalTasks += item._count.status;

  switch (item.status) {
    case TaskStatus.COMPLETED:
      completedTasks = item._count.status;
      break;

    case TaskStatus.IN_PROGRESS:
      inProgressTasks = item._count.status;
      break;

    case TaskStatus.PENDING:
      pendingCount = item._count.status;
      break;

    case TaskStatus.CANCELLED:
      cancelledCount = item._count.status;
      break;
  }
});

    const overallProductivityPercentage =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    const activePercentage =
      totalTasks === 0
        ? 0
        : Math.round((inProgressTasks / totalTasks) * 100);

    /*
    |--------------------------------------------------------------------------
    | TODAY COUNTS
    |--------------------------------------------------------------------------
    */

    // let todayCompletedCount = 0;
    // let todayPendingCount = 0;

    // weeklyTasks.forEach((task) => {
    //   const isTodayTask =
    //     task.startDate <= todayEnd && task.dueDate >= todayStart;

    //   if (!isTodayTask) return;

    //   if (
    //     task.completedAt &&
    //     task.completedAt >= todayStart &&
    //     task.completedAt <= todayEnd
    //   ) {
    //     todayCompletedCount++;
    //   } else if (task.status === TaskStatus.PENDING) {
    //     todayPendingCount++;
    //   }
    // });

    /*
    |--------------------------------------------------------------------------
    | WEEKLY PERFORMANCE
    |--------------------------------------------------------------------------
    */

    let weeklyPoints = 0;

    weeklyTasks.forEach((task) => {
      const isOverdue =
        task.dueDate < todayStart &&
        task.status !== TaskStatus.COMPLETED &&
        task.status !== TaskStatus.CANCELLED;

      switch (task.status) {
        case TaskStatus.COMPLETED:
          weeklyPoints += 10;
          break;
        case TaskStatus.IN_PROGRESS:
          weeklyPoints += 5;
          break;
        case TaskStatus.CANCELLED:
          weeklyPoints -= 5;
          break;
      }

      if (isOverdue) {
        weeklyPoints -= 10;
      }
    });

    const totalWeeklyTasks = weeklyTasks.length;
    const maxWeeklyPoints = totalWeeklyTasks * 10;

    const weeklyPerformancePercentage =
      maxWeeklyPoints === 0
        ? 0
        : Math.max(
            0,
            Math.round((weeklyPoints / maxWeeklyPoints) * 100)
          );

    /*
    |--------------------------------------------------------------------------
    | WEEKLY MESSAGE
    |--------------------------------------------------------------------------
    */

    let performanceLevel = "VERY_LOW";
    let message = "You're falling behind this week. Let's refocus 💪";

    if (weeklyPerformancePercentage >= 90) {
      performanceLevel = "EXCELLENT";
      message =
        "Outstanding performance! You're crushing your goals 🔥";
    } else if (weeklyPerformancePercentage >= 70) {
      performanceLevel = "GOOD";
      message =
        "Great job! You're staying consistent this week 🚀";
    } else if (weeklyPerformancePercentage >= 51) {
      performanceLevel = "AVERAGE";
      message =
        "You're progressing well, but there’s room to improve 👍";
    } else if (weeklyPerformancePercentage >= 31) {
      performanceLevel = "LOW";
      message =
        "You’ve made a start. Push a little more this week 📈";
    }

    /*
    |--------------------------------------------------------------------------
    | STREAK CALCULATION
    |--------------------------------------------------------------------------
    */

    const streak = this.calculateStreak(streakTasks);

    return {
      streak,

    //   today: {
    //     completedCount: todayCompletedCount,
    //     pendingCount: todayPendingCount
    //   },

      overdueTasksCount,

     overall: {
        totalTasks,
        completedTasks,
        overallProductivityPercentage,
        pendingCount,
        cancelledCount,
        inProgressCount: inProgressTasks
        },
      active: {
        inProgressTasks,
        activePercentage
      },

      weekly: {
        totalWeeklyTasks,
        weeklyPerformancePercentage,
        performanceLevel,
        message
      }
    };
  }

  /*
  |--------------------------------------------------------------------------
  | STREAK LOGIC
  |--------------------------------------------------------------------------
  */
private calculateStreak(tasks: any[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedDates = new Set<string>();

  tasks.forEach((task) => {
    if (task.completedAt) {
      const date = new Date(task.completedAt);
      date.setHours(0, 0, 0, 0);
      completedDates.add(date.toISOString());
    }
  });

  let streak = 0;
  let currentDate = new Date(today);

  // If no completion today, start from yesterday
  if (!completedDates.has(currentDate.toISOString())) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  const MAX_LOOKBACK_DAYS = 365;
  let checkedDays = 0;

  while (checkedDays < MAX_LOOKBACK_DAYS) {
    const dateString = currentDate.toISOString();

    if (completedDates.has(dateString)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
      checkedDays++;
    } else {
      break;
    }
  }

  return streak;
}


async getTasksByType(
  userId: string,
  type: string,
  cursor?: string,
  limit: number = 10
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let tasks;

  switch (type) {
    case "PENDING":
      tasks = await this.repository.getTasksByStatus(
        userId,
        TaskStatus.PENDING,
        cursor,
        limit
      );
      break;

    case "COMPLETED":
      tasks = await this.repository.getTasksByStatus(
        userId,
        TaskStatus.COMPLETED,
        cursor,
        limit
      );
      break;

    case "CANCELLED":
      tasks = await this.repository.getTasksByStatus(
        userId,
        TaskStatus.CANCELLED,
        cursor,
        limit
      );
      break;

    case "IN_PROGRESS":
      tasks = await this.repository.getTasksByStatus(
        userId,
        TaskStatus.IN_PROGRESS,
        cursor,
        limit
      );
      break;

    case "OVERDUE":
      tasks = await this.repository.getOverdueTasks(
        userId,
        today,
        cursor,
        limit
      );
      break;

    default:
      throw new Error("Invalid type");
  }

  let nextCursor: string | null = null;

  if (tasks.length > limit) {
    const nextItem = tasks.pop();
    nextCursor = nextItem?.id || null;
  }

  return {
    grouped: this.groupTasksByCategory(tasks),
    nextCursor
  };
}

private groupTasksByCategory(tasks: any[]) {
  const map = new Map();

  tasks.forEach((task) => {
    const category = task.category;
    const parent = category?.parent;

    const key = category?.id || "UNCATEGORIZED";

    if (!map.has(key)) {
      map.set(key, {
        categoryId: category?.id || null,
        categoryName: category?.name || "Uncategorized",
        parentCategoryId: parent?.id || null,
        parentCategoryName: parent?.name || null,
        tasks: []
      });
    }

    map.get(key).tasks.push({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      dueDate: task.dueDate,
      status: task.status,
      cancelledReason: task.cancelledReason || null
    });
  });

  return Array.from(map.values());
}
}