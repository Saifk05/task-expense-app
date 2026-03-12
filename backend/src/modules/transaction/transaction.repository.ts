import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionFilters,
  PaginationOptions,
} from "./transaction.types";

export class TransactionRepository {

  /* ------------------------------------------------ */
  /* CREATE TRANSACTION */
  /* ------------------------------------------------ */

  static async createTransaction(data: CreateTransactionInput) {
    return prisma.transaction.create({
      data: {
        userId: data.userId,
        accountId: data.accountId,
        categoryId: data.categoryId,
        title: data.title,
        description: data.description,
        type: data.type,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        totalAmount: data.totalAmount,
        transactionDate: data.transactionDate,
      },
    });
  }

  /* ------------------------------------------------ */
  /* FIND TRANSACTION BY ID */
  /* ------------------------------------------------ */

  static async findById(id: string) {
    return prisma.transaction.findUnique({
      where: { id },
    });
  }

  /* ------------------------------------------------ */
  /* GET TRANSACTIONS WITH FILTERS + PAGINATION */
  /* ------------------------------------------------ */

  static async getTransactions(
    userId: string,
    filters: TransactionFilters,
    pagination: PaginationOptions
  ) {
    const where: Prisma.TransactionWhereInput = {
      userId,
    };

    if (filters.accountId) {
      where.accountId = filters.accountId;
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.startDate || filters.endDate) {
      where.transactionDate = {};

      if (filters.startDate) {
        where.transactionDate.gte = filters.startDate;
      }

      if (filters.endDate) {
        where.transactionDate.lte = filters.endDate;
      }
    }

    if (filters.minAmount || filters.maxAmount) {
      where.totalAmount = {};

      if (filters.minAmount) {
        where.totalAmount.gte = filters.minAmount;
      }

      if (filters.maxAmount) {
        where.totalAmount.lte = filters.maxAmount;
      }
    }

    if (filters.search) {
      where.OR = [
        {
          title: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
      ];
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: {
        transactionDate: "desc",
      },
      take: pagination.limit ?? 10,
      skip: pagination.cursor ? 1 : 0,
      cursor: pagination.cursor
        ? { id: pagination.cursor }
        : undefined,

      include: {
        account: true,
        category: true,
      },
    });

    return transactions;
  }

  /* ------------------------------------------------ */
  /* UPDATE TRANSACTION */
  /* ------------------------------------------------ */

  static async updateTransaction(
    id: string,
    data: UpdateTransactionInput
  ) {
    return prisma.transaction.update({
      where: { id },
      data,
    });
  }

  /* ------------------------------------------------ */
  /* DELETE TRANSACTION */
  /* ------------------------------------------------ */

  static async deleteTransaction(id: string) {
    return prisma.transaction.delete({
      where: { id },
    });
  }

  /* ------------------------------------------------ */
  /* CALCULATE CATEGORY SPENDING (FOR BUDGET CHECK) */
  /* ------------------------------------------------ */

  static async getCategorySpending(
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
        transactionDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return result._sum.totalAmount ?? 0;
  }
}