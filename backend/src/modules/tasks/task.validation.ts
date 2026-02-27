  import { z } from "zod";
  import { TaskPriority, TaskStatus } from "@prisma/client";

  /* ============================= */
  /* CREATE TASK */
  /* ============================= */

export const createTaskSchema = z
  .object({
    description: z.string().trim().optional(),
    priority: z.nativeEnum(TaskPriority).optional(),

    categoryId: z.string().uuid("Valid categoryId is required"),
    subCategoryId: z.string().uuid("Valid subCategoryId is required"),

    startDate: z.string().datetime(),
    dueDate: z.string().datetime(),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startDate);
    const end = new Date(data.dueDate);

    if (start > end) {
      ctx.addIssue({
        code: "custom",
        message: "startDate must be less than or equal to dueDate",
        path: ["startDate"],
      });
    }
  });

  /* ============================= */
  /* UPDATE TASK */
  /* ============================= */

  export const updateTaskSchema = z
    .object({
      title: z.string().trim().min(1).optional(),
      description: z.string().trim().optional(),
      priority: z.nativeEnum(TaskPriority).optional(),
      status: z.nativeEnum(TaskStatus).optional(),

      categoryId: z.string().uuid().nullable().optional(),

      startDate: z.string().datetime().optional(),
      dueDate: z.string().datetime().optional(),
      cancelledReason: z.string().trim().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.startDate && data.dueDate) {
        const start = new Date(data.startDate);
        const end = new Date(data.dueDate);

        if (start > end) {
          ctx.addIssue({
            code: "custom",
            message: "startDate must be less than or equal to dueDate",
            path: ["startDate"],
          });
        }
      }

      if (data.status === "CANCELLED" && !data.cancelledReason) {
        ctx.addIssue({
          code: "custom",
          message: "Cancelled reason is required",
          path: ["cancelledReason"],
        });
      }
    });

  /* ============================= */
  /* GET TASKS */
  /* ============================= */

  // export const getTasksSchema = z
  //   .object({
  //     limit: z.coerce.number().int().positive().max(50).optional(),

  //     cursor: z.string().uuid().optional(),

  //     status: z
  //       .enum([
  //         "PENDING",
  //         "IN_PROGRESS",
  //         "COMPLETED",
  //         "CANCELLED",
  //         "OVERDUE",
  //       ])
  //       .optional(),

  //     priority: z.nativeEnum(TaskPriority).optional(),

  //     categoryId: z.string().uuid().optional(),

  //     startFrom: z.string().datetime().optional(),
  //     startTo: z.string().datetime().optional(),

  //     dueFrom: z.string().datetime().optional(),
  //     dueTo: z.string().datetime().optional(),
  //   })
  //   .superRefine((data, ctx) => {
  //     if (data.startFrom && data.startTo) {
  //       if (new Date(data.startFrom) > new Date(data.startTo)) {
  //         ctx.addIssue({
  //           code: "custom",
  //           message: "startFrom must be before startTo",
  //           path: ["startFrom"],
  //         });
  //       }
  //     }

  //     if (data.dueFrom && data.dueTo) {
  //       if (new Date(data.dueFrom) > new Date(data.dueTo)) {
  //         ctx.addIssue({
  //           code: "custom",
  //           message: "dueFrom must be before dueTo",
  //           path: ["dueFrom"],
  //         });
  //       }
  //     }
  //   });


  export const getTasksSchema = z
    .object({
      summary: z.coerce.boolean().optional(),   // ✅ NEW

      limit: z.coerce.number().int().positive().max(50).optional(),
      cursor: z.string().uuid().optional(),

      status: z
        .enum([
          "PENDING",
          "IN_PROGRESS",
          "COMPLETED",
          "CANCELLED",
          "OVERDUE",
        ])
        .optional(),

      priority: z.nativeEnum(TaskPriority).optional(),
      categoryId: z.string().uuid().optional(),
      startFrom: z.string().datetime().optional(),
      startTo: z.string().datetime().optional(),
      dueFrom: z.string().datetime().optional(),
      dueTo: z.string().datetime().optional(),
    })
  /* ============================= */
  /* CREATE TASK CATEGORY */
  /* ============================= */

  export const createTaskCategorySchema = z.object({
    name: z.string().trim().min(1, "Category name is required"),

    parentId: z.string().uuid().nullable().optional(),

    icon: z
      .string()
      .trim()
      .min(1, "Icon cannot be empty")
      .optional(),

    color: z
      .string()
      .trim()
      .regex(/^#([0-9A-Fa-f]{6})$/, "Color must be valid hex (#RRGGBB)")
      .optional(),
  });