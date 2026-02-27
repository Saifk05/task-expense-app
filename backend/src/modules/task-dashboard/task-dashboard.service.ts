import { TaskStatus } from "@prisma/client";
import { subDays, startOfDay, endOfDay, eachDayOfInterval } from "date-fns";
import { ProductivityQueryType } from "./task-dashboard.schema";
import { TaskDashboardResponse } from "./task-dashboard.types";
import { taskDashboardRepository } from "./task-dashboard.repository";

export const getTaskDashboard = async (
  userId: string,
  query: ProductivityQueryType
): Promise<TaskDashboardResponse> => {
  let fromDate: Date;
  let toDate: Date;

  if (query.weekStart && query.weekEnd) {
        
    fromDate = startOfDay(new Date(query.weekStart));
    toDate = endOfDay(new Date(query.weekEnd));
  } else {
    toDate = endOfDay(new Date());
    fromDate = startOfDay(subDays(toDate, 15));
  }

  const user = await taskDashboardRepository.getUserFirstName(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const [totalTasks, statusBreakdown, overdueCount, dailyActivityRaw] =
    await Promise.all([
      taskDashboardRepository.getTotalTasks(userId, fromDate, toDate),
      taskDashboardRepository.getStatusBreakdown(userId, fromDate, toDate),
      taskDashboardRepository.getOverdueTasks(userId, fromDate, toDate),
      taskDashboardRepository.getDailyActivity(userId, fromDate, toDate)
    ]);

  const statusMap: Record<string, number> = {};
  statusBreakdown.forEach((item) => {
    statusMap[item.status] = item._count.status;
  });

  const completedCount = statusMap[TaskStatus.COMPLETED] || 0;
  const pendingCount = statusMap[TaskStatus.PENDING] || 0;
  const inProgressCount = statusMap[TaskStatus.IN_PROGRESS] || 0;
  const cancelledCount = statusMap[TaskStatus.CANCELLED] || 0;

  const safeTotal = totalTasks === 0 ? 1 : totalTasks;

  const toPercentage = (value: number) =>
    Number(((value / safeTotal) * 100).toFixed(1));

  const completionRate = toPercentage(completedCount);

  const dateRange = eachDayOfInterval({
    start: fromDate,
    end: toDate
  });

  const activityMap: Record<string, number> = {};
  dailyActivityRaw.forEach((item) => {
    activityMap[item.date] = Number(item.count);
  });

  const weeklyActivity = dateRange.map((date) => {
    const formatted = date.toISOString().split("T")[0];
    return {
      date: formatted,
      count: activityMap[formatted] || 0
    };
  });

  return {
    firstName: user.firstName,

    range: {
      from: fromDate.toISOString(),
      to: toDate.toISOString()
    },

    weeklySummary: {
      totalTasks,
      completionRate
    },

    taskMetrics: {
      completed: { percentage: completionRate },
      pending: { percentage: toPercentage(pendingCount) },
      inProgress: { percentage: toPercentage(inProgressCount) },
      cancelled: { percentage: toPercentage(cancelledCount) },
      overdue: { percentage: toPercentage(overdueCount) }
    },

    weeklyActivity,

    statusDistribution: {
      completedPercentage: completionRate,
      cancelledPercentage: toPercentage(cancelledCount)
    }
  };
};