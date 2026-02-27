import { z } from "zod";

export const taskDashboardQuerySchema = z.object({
  weekStart: z.string().datetime().optional(),
  weekEnd: z.string().datetime().optional()
});

export type ProductivityQueryType = z.infer<
  typeof taskDashboardQuerySchema
>;