import { z } from "zod";
import { TransactionType } from "@prisma/client";

/* ------------------------------------------------ */
/* CREATE TRANSACTION */
/* ------------------------------------------------ */

export const createTransactionSchema = z.object({
  accountId: z.string().uuid("Invalid accountId"),

  categoryId: z.string().uuid("Invalid categoryId"),

  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  type: z.nativeEnum(TransactionType, {
    message: "Invalid transaction type",
  }),

  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1")
    .optional(),

  unitPrice: z
    .number()
    .min(0, "Unit price cannot be negative")
    .optional(),

  totalAmount: z
    .number()
    .min(0, "Total amount cannot be negative"),

  transactionDate: z.string().datetime(),
});

/* ------------------------------------------------ */
/* UPDATE TRANSACTION */
/* ------------------------------------------------ */

export const updateTransactionSchema = z.object({
  accountId: z
    .string()
    .uuid("Invalid accountId")
    .optional(),

  categoryId: z
    .string()
    .uuid("Invalid categoryId")
    .optional(),

  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1")
    .optional(),

  unitPrice: z
    .number()
    .min(0, "Unit price cannot be negative")
    .optional(),

  totalAmount: z
    .number()
    .min(0, "Total amount cannot be negative")
    .optional(),

  transactionDate: z
    .string()
    .datetime()
    .optional(),
});

/* ------------------------------------------------ */
/* PARAM VALIDATION */
/* ------------------------------------------------ */

export const transactionIdParamSchema = z.object({
  id: z.string().uuid("Invalid transaction id"),
});

/* ------------------------------------------------ */
/* QUERY FILTER VALIDATION */
/* ------------------------------------------------ */

export const transactionQuerySchema = z.object({
  accountId: z.string().uuid().optional(),

  categoryId: z.string().uuid().optional(),

  type: z.nativeEnum(TransactionType).optional(),

  startDate: z.string().datetime().optional(),

  endDate: z.string().datetime().optional(),

  minAmount: z
    .number()
    .min(0)
    .optional(),

  maxAmount: z
    .number()
    .min(0)
    .optional(),

  search: z
    .string()
    .trim()
    .max(100)
    .optional(),

  limit: z
    .number()
    .int()
    .min(1)
    .max(100)
    .optional(),

  cursor: z
    .string()
    .uuid()
    .optional(),
});