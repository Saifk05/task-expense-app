import { CategoryType } from "@prisma/client";

export function detectCategoryType(name: string): CategoryType {
  const lower = name.toLowerCase();

  /* ---------------- INCOME ---------------- */

  if (
    lower.includes("salary") ||
    lower.includes("income") ||
    lower.includes("bonus") ||
    lower.includes("commission") ||
    lower.includes("freelance")
  ) {
    return CategoryType.INCOME;
  }

  /* ---------------- INVESTMENT ---------------- */

  if (
    lower.includes("investment") ||
    lower.includes("stock") ||
    lower.includes("crypto") ||
    lower.includes("mutual")
  ) {
    return CategoryType.INVESTMENT;
  }

  /* ---------------- SAVINGS ---------------- */

  if (
    lower.includes("saving") ||
    lower.includes("emergency fund") ||
    lower.includes("education fund")
  ) {
    return CategoryType.SAVING;
  }

  /* ---------------- WANTS ---------------- */

  if (
    lower.includes("shopping") ||
    lower.includes("entertainment") ||
    lower.includes("travel") ||
    lower.includes("movies") ||
    lower.includes("dining")
  ) {
    return CategoryType.WANT;
  }

  /* ---------------- DEFAULT ---------------- */

  return CategoryType.NEED;
}