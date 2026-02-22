import { TaskPriority, TaskStatus  } from "@prisma/client";
import { TaskRepository } from "./task.repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(input: {
    userId: string;
    title: string;
    description?: string;
    priority?: TaskPriority;
    startDate: string;
    dueDate: string;
  }) {
    return this.taskRepository.createWithNotification({
      userId: input.userId,
      title: input.title.trim(),
      description: input.description,
      priority: input.priority ?? TaskPriority.MEDIUM,
      startDate: new Date(input.startDate),
      dueDate: new Date(input.dueDate),
    });
  }

  async updateTask(
  taskId: string,
  userId: string,
  input: {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    status?: any;
    startDate?: string;
    dueDate?: string;
    cancelledReason?: string;
  }
) {
  // Prepare update payload
  const updateData: any = {};

  if (input.title !== undefined) {
    updateData.title = input.title.trim();
  }

  if (input.description !== undefined) {
    updateData.description = input.description;
  }

  if (input.priority !== undefined) {
    updateData.priority = input.priority;
  }

  if (input.status !== undefined) {
    updateData.status = input.status;
  }

  if (input.startDate !== undefined) {
    updateData.startDate = new Date(input.startDate);
  }

  if (input.dueDate !== undefined) {
    updateData.dueDate = new Date(input.dueDate);
  }

  if (input.cancelledReason !== undefined) {
    updateData.cancelledReason = input.cancelledReason;
  }

  return this.taskRepository.updateTaskWithNotification(
    taskId,
    userId,
    updateData
  );
}

async getTasks(input: {
  userId: string;
  limit: number;
  cursor?: string;
  status?: TaskStatus | "OVERDUE";
  priority?: TaskPriority;
  categoryId?: string;        // ✅ ADD THIS
  startFrom?: string;
  startTo?: string;
  dueFrom?: string;
  dueTo?: string;
}) {
  const now = new Date();

  const defaultStartFrom = new Date();
  defaultStartFrom.setDate(now.getDate() - 15);

  const filters: any = {
    userId: input.userId,
  };

  /*
   =====================================
   CATEGORY FILTER
   =====================================
  */

  if (input.categoryId) {
    filters.categoryId = input.categoryId;
  }

  /*
   =====================================
   STATUS FILTER (with OVERDUE support)
   =====================================
  */

  if (input.status === "OVERDUE") {
    filters.status = {
      in: ["PENDING", "IN_PROGRESS"],
    };

    filters.dueDate = {
      lt: now,
    };
  } else if (input.status) {
    filters.status = input.status;
  }

  /*
   =====================================
   PRIORITY FILTER
   =====================================
  */

  if (input.priority) {
    filters.priority = input.priority;
  }

  /*
   =====================================
   START DATE FILTER
   =====================================
  */

  if (input.startFrom || input.startTo) {
    filters.startDate = {};

    if (input.startFrom) {
      filters.startDate.gte = new Date(input.startFrom);
    }

    if (input.startTo) {
      filters.startDate.lte = new Date(input.startTo);
    }
  } else {
    // Default: last 15 days
    filters.startDate = {
      gte: defaultStartFrom,
    };
  }

  /*
   =====================================
   DUE DATE FILTER (MERGE SAFE)
   =====================================
  */

  if (input.dueFrom || input.dueTo) {
    filters.dueDate = {
      ...(filters.dueDate || {}), // keeps overdue condition if present
    };

    if (input.dueFrom) {
      filters.dueDate.gte = new Date(input.dueFrom);
    }

    if (input.dueTo) {
      filters.dueDate.lte = new Date(input.dueTo);
    }
  }

  return this.taskRepository.getTasks({
    filters,
    limit: input.limit,
    cursor: input.cursor,
  });
}
async createTaskCategory(input: {
  userId: string;
  name: string;
  parentId?: string | null;
}) {
  return this.taskRepository.createTaskCategory(input);
}

async getTaskCategories(userId: string) {
  return this.taskRepository.getTaskCategories(userId);
}
}