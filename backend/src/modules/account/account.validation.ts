import { z } from "zod";
import { AccountType } from "@prisma/client";

/* ------------------------------------------------ */
/* CREATE ACCOUNT */
/* ------------------------------------------------ */

export const createAccountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Account name must be at least 2 characters")
    .max(50, "Account name must not exceed 50 characters"),

  type: z.nativeEnum(AccountType, {
    message: "Invalid account type",
  }),

  balance: z
    .number()
    .min(0, "Balance cannot be negative"),
});

/* ------------------------------------------------ */
/* UPDATE ACCOUNT */
/* ------------------------------------------------ */

export const updateAccountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Account name must be at least 2 characters")
    .max(50, "Account name must not exceed 50 characters")
    .optional(),

  type: z
    .nativeEnum(AccountType, {
      message: "Invalid account type",
    })
    .optional(),

  balance: z
    .number()
    .min(0, "Balance cannot be negative")
    .optional(),

  isActive: z.boolean().optional(),
});

/* ------------------------------------------------ */
/* PARAM VALIDATION */
/* ------------------------------------------------ */

export const accountIdParamSchema = z.object({
  id: z.string().uuid("Invalid account id"),
});