import { z } from "zod";
import { TaskPriority } from "@prisma/client";
import { TaskStatus } from "@prisma/client";


export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  startDate: z.string().datetime(),
  dueDate: z.string().datetime(),
}).superRefine((data, ctx) => {
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

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    priority: z.nativeEnum(TaskPriority).optional(),
    status: z.nativeEnum(TaskStatus).optional(),
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

export const getTasksSchema = z.object({
  limit: z
    .coerce.number()      // 👈 automatically converts string to number
    .int()
    .positive()
    .max(50)              // 👈 safety cap (important for production)
    .optional(),

  cursor: z.string().uuid().optional(),

  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED", "OVERDUE"])
    .optional(),

  priority: z.nativeEnum(TaskPriority).optional(),

  startFrom: z.string().datetime().optional(),
  startTo: z.string().datetime().optional(),

  dueFrom: z.string().datetime().optional(),
  dueTo: z.string().datetime().optional(),
});