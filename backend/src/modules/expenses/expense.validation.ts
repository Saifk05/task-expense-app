import { z } from "zod";
import { CategoryType } from "@prisma/client";

/* ------------------------------------------------ */
/* PARAM SCHEMAS */
/* ------------------------------------------------ */

export const categoryIdParamSchema = z.object({
  categoryId: z.string().uuid("Invalid categoryId"),
});

export const idParamSchema = z.object({
  id: z.string().uuid("Invalid id"),
});

/* ------------------------------------------------ */
/* CREATE CATEGORY */
/* ------------------------------------------------ */

// export const createCategorySchema = z.object({
//   name: z
//     .string()
//     .trim()
//     .min(2, "Category name must be at least 2 characters")
//     .max(50, "Category name must not exceed 50 characters"),

//     type: z.nativeEnum(CategoryType, {
//       message: "Invalid category type",
//     }),

//   icon: z
//     .string()
//     .trim()
//     .min(1, "Icon cannot be empty")
//     .max(100)
//     .optional(),

//   color: z
//     .string()
//     .trim()
//     .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color format")
//     .optional(),
// });

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters"),

  type: z.nativeEnum(CategoryType, {
    message: "Invalid category type",
  }).optional(), // ✅ FIX

  icon: z
    .string()
    .trim()
    .min(1, "Icon cannot be empty")
    .max(100)
    .optional(),

  color: z
    .string()
    .trim()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color format")
    .optional(),
});

/* ------------------------------------------------ */
/* CREATE SUBCATEGORY */
/* ------------------------------------------------ */

export const createSubCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Subcategory name must be at least 2 characters")
    .max(50, "Subcategory name must not exceed 50 characters"),

  icon: z
    .string()
    .trim()
    .min(1, "Icon cannot be empty")
    .max(100)
    .optional(),

  color: z
    .string()
    .trim()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color format")
    .optional(),
});

/* ------------------------------------------------ */
/* UPDATE CATEGORY */
/* ------------------------------------------------ */

export const updateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters")
    .optional(),

  icon: z
    .string()
    .trim()
    .min(1, "Icon cannot be empty")
    .max(100)
    .optional(),

  color: z
    .string()
    .trim()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color format")
    .optional(),
});

/* ------------------------------------------------ */
/* DELETE CATEGORY */
/* ------------------------------------------------ */

export const deleteCategorySchema = z.object({
  id: z.string().uuid("Invalid category id"),
});