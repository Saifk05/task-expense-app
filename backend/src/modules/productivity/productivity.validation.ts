import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Query Validation
|--------------------------------------------------------------------------
| Optional for future extensibility
|--------------------------------------------------------------------------
*/

export const productivityQuerySchema = z.object({
  weekStart: z
    .string()
    .datetime()
    .optional(),

  weekEnd: z
    .string()
    .datetime()
    .optional(),

  timezone: z
    .string()
    .optional()
});

/*
|--------------------------------------------------------------------------
| Infer Type (optional but recommended)
|--------------------------------------------------------------------------
*/

export type ProductivityQueryType = z.infer<
  typeof productivityQuerySchema
>;