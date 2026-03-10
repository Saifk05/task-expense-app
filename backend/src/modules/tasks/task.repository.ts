import { prisma } from "../../config/prisma";
import {
  Prisma,
  NotificationType,
  NotificationChannel,
  TaskPriority,
  TaskStatus,
} from "@prisma/client";
import { AppError } from "../../lib/errors/app-error";
import { ErrorCode } from "../../lib/errors/error-codes";

export class TaskRepository {

  // =====================================================
  // CREATE TASK WITH NOTIFICATION
  // =====================================================

async createWithNotification(data: {
  userId: string;
  description?: string;
  priority: TaskPriority;
  categoryId: string;     // parent
  subCategoryId: string;  // child
  startDate: Date;
  dueDate: Date;
}) {
  return prisma.$transaction(async (tx) => {

    const parentCategory = await tx.taskCategory.findFirst({
      where: {
        id: data.categoryId,
        userId: data.userId,
        parentId: null,
      },
    });

    if (!parentCategory) {
      throw new AppError(
        "Invalid parent category",
        400,
        ErrorCode.VALIDATION_ERROR
      );
    }

    const subCategory = await tx.taskCategory.findFirst({
      where: {
        id: data.subCategoryId,
        userId: data.userId,
        parentId: data.categoryId,
      },
    });

    if (!subCategory) {
      throw new AppError(
        "Invalid subcategory for selected category",
        400,
        ErrorCode.VALIDATION_ERROR
      );
    }

    const title = `${parentCategory.name} - ${subCategory.name}`;

    const task = await tx.task.create({
      data: {
        userId: data.userId,
        title,
        description: data.description,
        priority: data.priority,
        startDate: data.startDate,
        dueDate: data.dueDate,
        categoryId: data.subCategoryId,
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
  // =====================================================
  // UPDATE TASK WITH NOTIFICATION
  // =====================================================

  async updateTaskWithNotification(
    taskId: string,
    userId: string,
    updateData: {
      title?: string;
      description?: string;
      priority?: TaskPriority;
      status?: TaskStatus;
      categoryId?: string | null;
      startDate?: Date;
      dueDate?: Date;
      cancelledReason?: string;
    }
  ) {
    return prisma.$transaction(async (tx) => {

      const existingTask = await tx.task.findFirst({
        where: { id: taskId, userId },
      });

      if (!existingTask) {
        throw new AppError("Task not found", 404, ErrorCode.NOT_FOUND);
      }

      if (
        existingTask.status === TaskStatus.COMPLETED ||
        existingTask.status === TaskStatus.CANCELLED
      ) {
        throw new AppError(
          "Cannot modify completed or cancelled task",
          400,
          ErrorCode.VALIDATION_ERROR
        );
      }

      // Handle category relation properly
      let categoryRelation:
        | Prisma.TaskUpdateInput["category"]
        | undefined;

      if (updateData.categoryId !== undefined) {

        if (updateData.categoryId === null) {
          categoryRelation = { disconnect: true };
        } else {
          const category = await tx.taskCategory.findFirst({
            where: {
              id: updateData.categoryId,
              userId,
            },
          });

          if (!category) {
            throw new AppError(
              "Invalid category",
              400,
              ErrorCode.VALIDATION_ERROR
            );
          }

          categoryRelation = {
            connect: { id: updateData.categoryId },
          };
        }
      }

      const updatedTask = await tx.task.update({
        where: { id: taskId },
        data: {
          ...(updateData.title !== undefined && { title: updateData.title }),
          ...(updateData.description !== undefined && { description: updateData.description }),
          ...(updateData.priority !== undefined && { priority: updateData.priority }),
          ...(updateData.startDate !== undefined && { startDate: updateData.startDate }),
          ...(updateData.dueDate !== undefined && { dueDate: updateData.dueDate }),
          ...(updateData.cancelledReason !== undefined && {
            cancelledReason: updateData.cancelledReason,
          }),
          ...(categoryRelation && { category: categoryRelation }),

          ...(updateData.status === TaskStatus.COMPLETED && {
            status: TaskStatus.COMPLETED,
            completedAt: new Date(),
          }),

          ...(updateData.status === TaskStatus.CANCELLED && {
            status: TaskStatus.CANCELLED,
          }),

          ...(updateData.status &&
            updateData.status !== TaskStatus.COMPLETED &&
            updateData.status !== TaskStatus.CANCELLED && {
              status: updateData.status,
              completedAt: null,
            }),
        },
      });

      let notificationType: NotificationType = NotificationType.TASK_UPDATED;
      let message = `Task "${updatedTask.title}" has been updated.`;

      if (updatedTask.status === TaskStatus.COMPLETED) {
        notificationType = NotificationType.TASK_COMPLETED;
        message = `Task "${updatedTask.title}" has been completed.`;
      }

      if (updatedTask.status === TaskStatus.COMPLETED) {
        await tx.notification.deleteMany({
          where: {
            relatedTaskId: taskId,
            type: NotificationType.TASK_OVERDUE,
          },
        });
      }

      if (updatedTask.status === TaskStatus.CANCELLED) {
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

  // =====================================================
  // GET TASKS (PAGINATED)
  // =====================================================

  async getTasks(input: {
    filters: Prisma.TaskWhereInput;
    limit: number;
    cursor?: string;
  }) {
    const { filters, limit, cursor } = input;

    const tasks = await prisma.task.findMany({
      where: filters,
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: [
        { dueDate: "asc" },
        { id: "asc" },
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

  // =====================================================
  // CREATE TASK CATEGORY (WITH ICON + COLOR)
  // =====================================================

  // async createTaskCategory(input: {
  //   userId: string;
  //   name: string;
  //   parentId?: string | null;
  //   icon?: string | null;
  //   color?: string | null;
  // }) {

  //   if (input.parentId) {
  //     const parent = await prisma.taskCategory.findFirst({
  //       where: {
  //         id: input.parentId,
  //         userId: input.userId,
  //         parentId: null,
  //       },
  //     });

  //     if (!parent) {
  //       throw new AppError(
  //         "Invalid parent category",
  //         400,
  //         ErrorCode.VALIDATION_ERROR
  //       );
  //     }
  //   }

  //   return prisma.taskCategory.create({
  //     data: {
  //       userId: input.userId,
  //       name: input.name.trim(),
  //       parentId: input.parentId ?? null,
  //       icon: input.icon ?? null,
  //       color: input.color ?? null,
  //     },
  //   });
  // }

  async createTaskCategory(input: {
  userId: string;
  name: string;
  parentId?: string | null;
  icon?: string | null;
  color?: string | null;
}) {
  const normalizedName = input.name.trim();

  if (!normalizedName) {
    throw new AppError(
      "Category name is required",
      400,
      ErrorCode.VALIDATION_ERROR
    );
  }

  if (input.parentId) {
    const parent = await prisma.taskCategory.findFirst({
      where: {
        id: input.parentId,
        userId: input.userId,
        parentId: null,
      },
    });

    if (!parent) {
      throw new AppError(
        "Invalid parent category",
        400,
        ErrorCode.VALIDATION_ERROR
      );
    }
  }

  const existingCategory = await prisma.taskCategory.findFirst({
    where: {
      userId: input.userId,
      parentId: input.parentId ?? null,
      name: {
        equals: normalizedName,
        mode: "insensitive",
      },
    },
  });

  if (existingCategory) {
    throw new AppError(
      input.parentId
        ? "Subcategory already exists under this category"
        : "Category already exists",
      400,
      ErrorCode.VALIDATION_ERROR
    );
  }

  return prisma.taskCategory.create({
    data: {
      userId: input.userId,
      name: normalizedName,
      parentId: input.parentId ?? null,
      icon: input.icon ?? null,
      color: input.color ?? null,
    },
  });
}

  // =====================================================
  // GET TASK CATEGORIES WITH CHILDREN
  // =====================================================

async getTaskCategories(userId: string) {
  return prisma.taskCategory.findMany({
    where: {
      userId,
      parentId: null,
    },
    include: {
      children: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}


async getTaskSummary(userId: string) {
  const now = new Date();

  // 1️⃣ Create overdue notifications (only once per task)
  const overdueTasksWithoutNotification = await prisma.task.findMany({
    where: {
      userId,
      dueDate: { lt: now },
      status: {
        in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS],
      },
      notifications: {
        none: {
          type: "TASK_OVERDUE",
        },
      },
    },
    select: {
      id: true,
      title: true,
    },
  });


  if (overdueTasksWithoutNotification.length > 0) {

  // 🔥 Auto set priority HIGH for overdue tasks
  await prisma.task.updateMany({
    where: {
      id: {
        in: overdueTasksWithoutNotification.map(t => t.id),
      },
    },
    data: {
      priority: TaskPriority.HIGH,
    },
  });

  await prisma.notification.createMany({
    data: overdueTasksWithoutNotification.map((task) => ({
      userId,
      title: "Task Overdue",
      message: `Task "${task.title}" is overdue.`,
      type: NotificationType.TASK_OVERDUE,
      deliveryChannel: NotificationChannel.IN_APP,
      relatedTaskId: task.id,
      isSent: true,
      sentAt: now,
    })),
  });
}
  // if (overdueTasksWithoutNotification.length > 0) {
  //   await prisma.notification.createMany({
  //     data: overdueTasksWithoutNotification.map((task) => ({
  //       userId,
  //       title: "Task Overdue",
  //       message: `Task "${task.title}" is overdue.`,
  //       type: "TASK_OVERDUE",
  //       deliveryChannel: "IN_APP",
  //       relatedTaskId: task.id,
  //       isSent: true,
  //       sentAt: now,
  //     })),
  //   });
  // }

  // 2️⃣ Run summary queries
  const [
    unreadCount,
    total,
    completed,
    pending,
    overdue,
    user,
  ] = await prisma.$transaction([
    prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    }),

    prisma.task.count({
      where: { userId },
    }),

    prisma.task.count({
      where: {
        userId,
        status: TaskStatus.COMPLETED,
      },
    }),

    prisma.task.count({
      where: {
        userId,
        status: TaskStatus.PENDING,
      },
    }),

    prisma.task.count({
      where: {
        userId,
        status: {
          in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS],
        },
        dueDate: {
          lt: now,
        },
      },
    }),

    prisma.user.findUnique({
      where: { id: userId },
      select: {
        address: true,
        city: true,
        pincode: true,
        profilePictureUrl: true,
        isMfaEnabled: true,
      },
    }),
  ]);

  const isIncomplete =
    !user ||
    !user.address ||
    !user.city ||
    !user.pincode;

  return {
    notifications: {
      unreadCount,
    },
    profile: {
      isIncomplete,
      profilePictureUrl: user?.profilePictureUrl ?? null,
      mfaEnabled: user?.isMfaEnabled ?? false,
    },
    tasks: {
      total,
      completed,
      pending,
      overdue,
    },
  };
}
// async getTaskSummary(userId: string) {
//   const now = new Date();

  
//   const [
//     unreadCount,
//     total,
//     completed,
//     pending,
//     overdue,
//     user,
//   ] = await prisma.$transaction([
//     prisma.notification.count({
//       where: {
//         userId,
//         isRead: false,
//       },
//     }),

//     prisma.task.count({
//       where: { userId },
//     }),

//     prisma.task.count({
//       where: {
//         userId,
//         status: TaskStatus.COMPLETED,
//       },
//     }),

//     prisma.task.count({
//       where: {
//         userId,
//         status: TaskStatus.PENDING,
//       },
//     }),

//     prisma.task.count({
//       where: {
//         userId,
//         status: {
//           in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS],
//         },
//         dueDate: {
//           lt: now,
//         },
//       },
//     }),

//     prisma.user.findUnique({
//       where: { id: userId },
//       select: {
//         address: true,
//         city: true,
//         pincode: true,
//         profilePictureUrl: true, 
//         isMfaEnabled: true,
//       },
//     }),
//     // prisma.user.findUnique({
//     //   where: { id: userId },
//     //   select: {
//     //     address: true,
//     //     city: true,
//     //     pincode: true,
//     //     phoneNumber: true,
//     //     dateOfBirth: true,
//     //   },
//     // }),
//   ]);

//   const isIncomplete =
//     !user ||
//     !user.address ||
//     !user.city ||
//     !user.pincode 

//   return {
//     notifications: {
//       unreadCount,
//     },
//     profile: {
//       isIncomplete,
//       profilePictureUrl: user?.profilePictureUrl ?? null,
//       mfaEnabled: user?.isMfaEnabled ?? false,
//     },
//     tasks: {
//       total,
//       completed,
//       pending,
//       overdue,
//     },
//   };
// }

// =====================================================
// DELETE TASK CATEGORY
// =====================================================

async deleteTaskCategory(categoryId: string, userId: string) {
  return prisma.$transaction(async (tx) => {

    const category = await tx.taskCategory.findFirst({
      where: {
        id: categoryId,
        userId,
      },
      include: {
        children: true,
      },
    });

    if (!category) {
      throw new AppError("Category not found", 404, ErrorCode.NOT_FOUND);
    }

    // Collect all category IDs (parent + children)
    const categoryIds = [
      category.id,
      ...category.children.map((child) => child.id),
    ];

    const activeTasks = await tx.task.count({
      where: {
        userId,
        categoryId: {
          in: categoryIds,
        },
        status: {
          in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS],
        },
      },
    });

    if (activeTasks > 0) {
      throw new AppError(
        "Cannot delete category with active tasks. Complete or cancel tasks first.",
        400,
        ErrorCode.VALIDATION_ERROR
      );
    }

    await tx.taskCategory.deleteMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    return {
      deleted: true,
      deletedCategoryIds: categoryIds,
    };
  });
}
}