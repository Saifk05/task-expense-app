import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";
import {
  CreateBudgetInput,
  UpdateBudgetInput,
  BudgetFilters,
  BudgetPagination,
} from "./budget.types";

export class BudgetRepository {

  static async createBudget(data: CreateBudgetInput) {
    return prisma.budget.create({
      data: {
        userId: data.userId,
        categoryId: data.categoryId,
        amountLimit: data.amountLimit,
        startDate: data.startDate,
        endDate: data.endDate,
        thresholdPercentage: data.thresholdPercentage,
      },
    });
  }

  static async findById(id: string) {
    return prisma.budget.findUnique({
      where: { id },
    });
  }

  static async findActiveBudget(
    userId: string,
    categoryId: string,
    date: Date
  ) {
    return prisma.budget.findFirst({
      where: {
        userId,
        categoryId,
        isActive: true,
        startDate: { lte: date },
        endDate: { gte: date },
      },
    });
  }

  static async getBudgets(
    userId: string,
    filters: BudgetFilters,
    pagination: BudgetPagination
  ) {
    const where: Prisma.BudgetWhereInput = {
      userId,
    };

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.startDate || filters.endDate) {
      where.startDate = {};

      if (filters.startDate) {
        where.startDate.gte = filters.startDate;
      }

      if (filters.endDate) {
        where.startDate.lte = filters.endDate;
      }
    }

    const budgets = await prisma.budget.findMany({
      where,
      orderBy: [
        { startDate: "desc" },
        { id: "desc" },
      ],
      take: pagination.limit ?? 10,
      skip: pagination.cursor ? 1 : 0,
      cursor: pagination.cursor
        ? { id: pagination.cursor }
        : undefined,
      include: {
        category: true,
      },
    });

    const nextCursor =
      budgets.length === (pagination.limit ?? 10)
        ? budgets[budgets.length - 1].id
        : undefined;

    return {
      data: budgets,
      nextCursor,
    };
  }

  static async updateBudget(
    id: string,
    data: UpdateBudgetInput
  ) {
    return prisma.budget.update({
      where: { id },
      data,
    });
  }

  static async deleteBudget(id: string) {
    return prisma.budget.delete({
      where: { id },
    });
  }

  static async getBudgetSpending(
  userId: string,
  categoryId: string,
  startDate: Date,
  endDate: Date
) {
  const result = await prisma.transaction.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      userId,
      categoryId,
      type: "EXPENSE",
      transactionDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const spent = result._sum.totalAmount;

  return spent ? Number(spent) : 0;
}
}