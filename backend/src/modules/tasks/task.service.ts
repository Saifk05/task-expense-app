import { TaskPriority, TaskStatus } from "@prisma/client";
import { TaskRepository } from "./task.repository";
import {
  generateCategoryIcon,
  normalizeCategoryName,
} from "../../lib/utils/category-icon.util";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  /* ============================= */
  /* CREATE TASK */
  /* ============================= */
  async createTask(input: {
  userId: string;
  description?: string;
  categoryId: string;
  subCategoryId: string;
  startDate: string;
  dueDate: string;
}) {
  const startDate = new Date(input.startDate);
  const dueDate = new Date(input.dueDate);
  const now = new Date();

  const diffInMs = dueDate.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  let priority: TaskPriority;

  if (diffInDays <= 0) {
    priority = TaskPriority.HIGH;
  } else if (diffInDays <= 2) {
    priority = TaskPriority.HIGH;
  } else if (diffInDays <= 5) {
    priority = TaskPriority.MEDIUM;
  } else {
    priority = TaskPriority.LOW;
  }

  return this.taskRepository.createWithNotification({
    userId: input.userId,
    description: input.description,
    priority,
    categoryId: input.categoryId,
    subCategoryId: input.subCategoryId,
    startDate,
    dueDate,
  });
}

  /* ============================= */
  /* UPDATE TASK */
  /* ============================= */

  async updateTask(
    taskId: string,
    userId: string,
    input: {
      title?: string;
      description?: string;
      priority?: TaskPriority;
      status?: TaskStatus;
      categoryId?: string | null;
      startDate?: string;
      dueDate?: string;
      cancelledReason?: string;
    }
  ) {
    const updateData: Record<string, any> = {};

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

    if (input.categoryId !== undefined) {
      updateData.categoryId = input.categoryId;
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

  /* ============================= */
  /* GET TASKS */
  /* ============================= */

  async getTasks(input: {
    userId: string;
    limit: number;
    cursor?: string;
    status?: TaskStatus | "OVERDUE";
    priority?: TaskPriority;
    categoryId?: string;
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

    /* CATEGORY FILTER */
    if (input.categoryId) {
      filters.categoryId = input.categoryId;
    }

    /* STATUS FILTER */
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

    /* PRIORITY FILTER */
    if (input.priority) {
      filters.priority = input.priority;
    }

    /* START DATE FILTER */
    if (input.startFrom || input.startTo) {
      filters.startDate = {};

      if (input.startFrom) {
        filters.startDate.gte = new Date(input.startFrom);
      }

      if (input.startTo) {
        filters.startDate.lte = new Date(input.startTo);
      }
    } else {
      filters.startDate = {
        gte: defaultStartFrom,
      };
    }

    /* DUE DATE FILTER */
    if (input.dueFrom || input.dueTo) {
      filters.dueDate = {
        ...(filters.dueDate || {}),
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


  async getTaskSummary(userId: string) {
  return this.taskRepository.getTaskSummary(userId);
}


  /* ============================= */
  /* CREATE TASK CATEGORY */
  /* ============================= */

  async createTaskCategory(input: {
  userId: string;
  name: string;
  parentId?: string | null;
  icon?: string | null;
  color?: string | null;
}) {
  const normalizedName = normalizeCategoryName(input.name);
  const resolvedIcon = input.icon?.trim() || generateCategoryIcon(normalizedName);

  return this.taskRepository.createTaskCategory({
    userId: input.userId,
    name: normalizedName,
    parentId: input.parentId ?? null,
    icon: resolvedIcon,
    color: input.color ?? null,
  });
}

  /* ============================= */
  /* GET TASK CATEGORIES */
  /* ============================= */

  async getTaskCategories(userId: string) {
    return this.taskRepository.getTaskCategories(userId);
  }

  /* ============================= */
  /* DELETE TASK CATEGORY */
  /* ============================= */

  async deleteTaskCategory(categoryId: string, userId: string) {
    return this.taskRepository.deleteTaskCategory(categoryId, userId);
  }
}