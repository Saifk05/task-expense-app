import { prisma } from "../../config/prisma";
import { Prisma, NotificationType, NotificationChannel, TaskPriority  } from "@prisma/client";

export class TaskRepository {
  async createWithNotification(data: {
    userId: string;
    title: string;
    description?: string;
    priority: TaskPriority;
    startDate: Date;
    dueDate: Date;
  }) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const task = await tx.task.create({
        data: {
          userId: data.userId,
          title: data.title,
          description: data.description,
          priority: data.priority,
          startDate: data.startDate,
          dueDate: data.dueDate,
        },
      });

      await tx.notification.create({
        data: {
          userId: data.userId,
          title: "Task Created",
          message: `Task "${task.title}" has been created successfully.`,
          type: NotificationType.TASK_CREATED,
          deliveryChannel: NotificationChannel.IN_APP,
          relatedTaskId: task.id,
        },
      });

      return task;
    });
  }

  async updateTaskWithNotification(
  taskId: string,
  userId: string,
  updateData: any
) {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {

    const existingTask = await tx.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!existingTask) {
      throw new Error("Task not found");
    }

    // ❌ Prevent modification if already completed or cancelled
    if (
      existingTask.status === "COMPLETED" ||
      existingTask.status === "CANCELLED"
    ) {
      throw new Error("Cannot modify completed or cancelled task");
    }

    // ✅ Validate status transitions
    if (updateData.status) {
      const currentStatus = existingTask.status;
      const newStatus = updateData.status;

      const validTransitions: Record<string, string[]> = {
        PENDING: ["IN_PROGRESS", "COMPLETED", "CANCELLED"],
        IN_PROGRESS: ["COMPLETED", "CANCELLED"],
      };

      if (
        validTransitions[currentStatus] &&
        !validTransitions[currentStatus].includes(newStatus)
      ) {
        throw new Error("Invalid status transition");
      }

      // If cancelling, require reason
      if (newStatus === "CANCELLED" && !updateData.cancelledReason) {
        throw new Error("Cancelled reason is required");
      }
    }

    const updatedTask = await tx.task.update({
      where: { id: taskId },
      data: updateData,
    });

    // 🔔 Notification Logic
    let notificationType: NotificationType = NotificationType.TASK_UPDATED;
    let message = `Task "${updatedTask.title}" has been updated.`;

    if (updateData.status === "COMPLETED") {
      notificationType = NotificationType.TASK_COMPLETED;
      message = `Task "${updatedTask.title}" has been completed.`;
    }

    if (updateData.status === "CANCELLED") {
      notificationType = NotificationType.TASK_UPDATED;
      message = `Task "${updatedTask.title}" has been cancelled.`;
    }

    await tx.notification.create({
      data: {
        userId,
        title: "Task Update",
        message,
        type: notificationType,
        deliveryChannel: NotificationChannel.IN_APP,
        relatedTaskId: taskId,
      },
    });

    return updatedTask;
  });
}

async getTasks(input: {
  filters: any;
  limit: number;
  cursor?: string;
}) {
  const { filters, limit, cursor } = input;

  const tasks = await prisma.task.findMany({
    where: filters,
    take: limit + 1, // Fetch one extra to check next cursor
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    orderBy: [
      { dueDate: "asc" }, // Nearest due first
      { createdAt: "desc" },
    ],
  });

  let nextCursor: string | null = null;

  if (tasks.length > limit) {
    const nextItem = tasks.pop();
    nextCursor = nextItem!.id;
  }

  return {
    data: tasks,
    nextCursor,
  };
}
}