import { prisma } from "../../config/prisma";
import { TransactionRepository } from "./transaction.repository";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionFilters,
  PaginationOptions,
} from "./transaction.types";
import { ErrorCode } from "../../lib/errors/error-codes";
import { TransactionType } from "@prisma/client";

export class TransactionService {

  /* ------------------------------------------------ */
  /* CREATE TRANSACTION */
  /* ------------------------------------------------ */

  static async createTransaction(input: CreateTransactionInput) {

    const account = await prisma.account.findUnique({
      where: { id: input.accountId },
    });

    if (!account) {
      throw new Error(ErrorCode.ACCOUNT_NOT_FOUND);
    }

    if (account.userId !== input.userId) {
      throw new Error(ErrorCode.FORBIDDEN);
    }

    let totalAmount = input.totalAmount;

    if (input.quantity && input.unitPrice) {
      totalAmount = input.quantity * input.unitPrice;
    }

    const result = await prisma.$transaction(async (tx) => {

      const transaction = await tx.transaction.create({
        data: {
          userId: input.userId,
          accountId: input.accountId,
          categoryId: input.categoryId,
          title: input.title,
          description: input.description,
          type: input.type,
          quantity: input.quantity,
          unitPrice: input.unitPrice,
          totalAmount,
          transactionDate: input.transactionDate,
        },
      });

      /* ACCOUNT BALANCE UPDATE */

      if (input.type === TransactionType.EXPENSE) {
        await tx.account.update({
          where: { id: input.accountId },
          data: {
            balance: {
              decrement: totalAmount,
            },
          },
        });
      }

      if (input.type === TransactionType.INCOME) {
        await tx.account.update({
          where: { id: input.accountId },
          data: {
            balance: {
              increment: totalAmount,
            },
          },
        });
      }

      return transaction;
    });

    return result;
  }

  /* ------------------------------------------------ */
  /* GET TRANSACTIONS */
  /* ------------------------------------------------ */

  static async getTransactions(
    userId: string,
    filters: TransactionFilters,
    pagination: PaginationOptions
  ) {
    return TransactionRepository.getTransactions(userId, filters, pagination);
  }

  /* ------------------------------------------------ */
  /* UPDATE TRANSACTION */
  /* ------------------------------------------------ */

  static async updateTransaction(
    id: string,
    userId: string,
    data: UpdateTransactionInput
  ) {

    const transaction = await TransactionRepository.findById(id);

    if (!transaction) {
      throw new Error(ErrorCode.TRANSACTION_NOT_FOUND);
    }

    if (transaction.userId !== userId) {
      throw new Error(ErrorCode.FORBIDDEN);
    }

    return TransactionRepository.updateTransaction(id, data);
  }

  /* ------------------------------------------------ */
  /* DELETE TRANSACTION */
  /* ------------------------------------------------ */

  static async deleteTransaction(id: string, userId: string) {

    const transaction = await TransactionRepository.findById(id);

    if (!transaction) {
      throw new Error(ErrorCode.TRANSACTION_NOT_FOUND);
    }

    if (transaction.userId !== userId) {
      throw new Error(ErrorCode.FORBIDDEN);
    }

    return TransactionRepository.deleteTransaction(id);
  }
}