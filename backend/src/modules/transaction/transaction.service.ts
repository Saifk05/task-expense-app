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
import { detectTransactionCategory } from "../../lib/utils/merchant-category.util";


export class TransactionService {

  private static calculateAmount(
    quantity?: number,
    unitPrice?: number,
    total?: number
  ) {
    if (quantity && unitPrice) {
      return quantity * unitPrice;
    }
    return total ?? 0;
  }

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

    const totalAmount = this.calculateAmount(
      input.quantity,
      input.unitPrice,
      input.totalAmount
    );

    let categoryId = input.categoryId;

if (!categoryId && input.title) {

  const detection = detectTransactionCategory(input.title);

  if (detection) {

    const parentCategory = await prisma.category.findFirst({
      where: {
        userId: input.userId,
        name: detection.category,
        parentId: null,
      },
    });

    if (parentCategory) {

      if (detection.subCategory) {

        const subCategory = await prisma.category.findFirst({
          where: {
            parentId: parentCategory.id,
            name: detection.subCategory,
          },
        });

        if (subCategory) {
          categoryId = subCategory.id;
        }

      } else {
        categoryId = parentCategory.id;
      }

    }

  }

}

    const result = await prisma.$transaction(async (tx) => {

  const account = await tx.account.findUnique({
    where: { id: input.accountId },
    select: { balance: true }
  });

  if (!account) {
    throw new Error(ErrorCode.ACCOUNT_NOT_FOUND);
  }

  /* ------------------------------------ */
  /* PREVENT NEGATIVE BALANCE */
  /* ------------------------------------ */

    if (
    input.type === TransactionType.EXPENSE &&
    account.balance.toNumber() < totalAmount
    ) {
    throw new Error("INSUFFICIENT_BALANCE");
    }

  /* ------------------------------------ */
  /* CREATE TRANSACTION */
  /* ------------------------------------ */

  const transaction = await tx.transaction.create({
    data: {
      userId: input.userId,
      accountId: input.accountId,
      categoryId: categoryId,
      title: input.title,
      description: input.description,
      type: input.type,
      quantity: input.quantity,
      unitPrice: input.unitPrice,
      totalAmount,
      transactionDate: input.transactionDate,
    },
  });

  /* ------------------------------------ */
  /* UPDATE ACCOUNT BALANCE */
  /* ------------------------------------ */

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

  static async getTransactions(
    userId: string,
    filters: TransactionFilters,
    pagination: PaginationOptions
  ) {
    return TransactionRepository.getTransactions(userId, filters, pagination);
  }

  static async updateTransaction(
    id: string,
    userId: string,
    data: UpdateTransactionInput
  ) {

    const existingTransaction = await TransactionRepository.findById(id);

    if (!existingTransaction) {
      throw new Error(ErrorCode.TRANSACTION_NOT_FOUND);
    }

    if (existingTransaction.userId !== userId) {
      throw new Error(ErrorCode.FORBIDDEN);
    }

    if (data.accountId) {
      const account = await prisma.account.findUnique({
        where: { id: data.accountId },
      });

      if (!account) {
        throw new Error(ErrorCode.ACCOUNT_NOT_FOUND);
      }

      if (account.userId !== userId) {
        throw new Error(ErrorCode.FORBIDDEN);
      }
    }

    const newAccountId = data.accountId ?? existingTransaction.accountId;
    const newType = data.type ?? existingTransaction.type;

    const newTotalAmount = this.calculateAmount(
      data.quantity,
      data.unitPrice,
      data.totalAmount ?? Number(existingTransaction.totalAmount)
    );

    const oldTotalAmount = Number(existingTransaction.totalAmount);

    const result = await prisma.$transaction(async (tx) => {

      if (existingTransaction.type === TransactionType.EXPENSE) {
        await tx.account.update({
          where: { id: existingTransaction.accountId },
          data: {
            balance: {
              increment: oldTotalAmount,
            },
          },
        });
      }

      if (existingTransaction.type === TransactionType.INCOME) {
        await tx.account.update({
          where: { id: existingTransaction.accountId },
          data: {
            balance: {
              decrement: oldTotalAmount,
            },
          },
        });
      }

      const updatedTransaction = await tx.transaction.update({
        where: { id },
        data: {
          ...data,
          totalAmount: newTotalAmount,
        },
      });

      if (newType === TransactionType.EXPENSE) {
        await tx.account.update({
          where: { id: newAccountId },
          data: {
            balance: {
              decrement: newTotalAmount,
            },
          },
        });
      }

      if (newType === TransactionType.INCOME) {
        await tx.account.update({
          where: { id: newAccountId },
          data: {
            balance: {
              increment: newTotalAmount,
            },
          },
        });
      }

      return updatedTransaction;
    });

    return result;
  }

  static async deleteTransaction(id: string, userId: string) {

    const transaction = await TransactionRepository.findById(id);

    if (!transaction) {
      throw new Error(ErrorCode.TRANSACTION_NOT_FOUND);
    }

    if (transaction.userId !== userId) {
      throw new Error(ErrorCode.FORBIDDEN);
    }

    const amount = Number(transaction.totalAmount);

    const result = await prisma.$transaction(async (tx) => {

      if (transaction.type === TransactionType.EXPENSE) {
        await tx.account.update({
          where: { id: transaction.accountId },
          data: {
            balance: {
              increment: amount,
            },
          },
        });
      }

      if (transaction.type === TransactionType.INCOME) {
        await tx.account.update({
          where: { id: transaction.accountId },
          data: {
            balance: {
              decrement: amount,
            },
          },
        });
      }

      await tx.transaction.delete({
        where: { id },
      });

      return true;
    });

    return result;
  }
}