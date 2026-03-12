import { z } from "zod";

export const createBudgetSchema = z
  .object({
    categoryId: z.string().uuid("Valid categoryId is required"),

    amountLimit: z
      .number()
      .positive("Budget limit must be greater than 0"),

    startDate: z.string().datetime(),

    endDate: z.string().datetime(),

    thresholdPercentage: z
      .number()
      .min(1, "Threshold must be at least 1%")
      .max(100, "Threshold cannot exceed 100%")
      .optional(),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (start > end) {
      ctx.addIssue({
        code: "custom",
        message: "startDate must be before endDate",
        path: ["startDate"],
      });
    }
  });

export const updateBudgetSchema = z
  .object({
    amountLimit: z
      .number()
      .positive("Budget limit must be greater than 0")
      .optional(),

    startDate: z.string().datetime().optional(),

    endDate: z.string().datetime().optional(),

    thresholdPercentage: z
      .number()
      .min(1)
      .max(100)
      .optional(),

    isActive: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      if (start > end) {
        ctx.addIssue({
          code: "custom",
          message: "startDate must be before endDate",
          path: ["startDate"],
        });
      }
    }
  });

export const budgetIdParamSchema = z.object({
  id: z.string().uuid("Invalid budget id"),
});

export const budgetQuerySchema = z.object({
  categoryId: z.string().uuid().optional(),
  isActive: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  cursor: z.string().uuid().optional(),
});