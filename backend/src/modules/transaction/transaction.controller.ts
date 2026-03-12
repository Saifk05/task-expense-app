import { Response, NextFunction } from "express";
import { AuthRequest } from "../../lib/middleware/auth.middleware";
import { TransactionService } from "./transaction.service";
import {
  createTransactionSchema,
  updateTransactionSchema,
  transactionIdParamSchema,
  transactionQuerySchema,
} from "./transaction.validation";

export class TransactionController {

  /* ------------------------------------------------ */
  /* CREATE TRANSACTION */
  /* ------------------------------------------------ */

  static createTransaction = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parsed = createTransactionSchema.parse(req.body);

      const transaction = await TransactionService.createTransaction({
        userId: req.user!.userId,
        accountId: parsed.accountId,
        categoryId: parsed.categoryId,
        title: parsed.title,
        description: parsed.description,
        type: parsed.type,
        quantity: parsed.quantity,
        unitPrice: parsed.unitPrice,
        totalAmount: parsed.totalAmount,
        transactionDate: new Date(parsed.transactionDate),
      });

      return res.status(201).json({
        success: true,
        data: transaction,
      });

    } catch (error) {
      next(error);
    }
  };

  /* ------------------------------------------------ */
  /* GET TRANSACTIONS */
  /* ------------------------------------------------ */

  static getTransactions = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const query = transactionQuerySchema.parse(req.query);

      const filters = {
        accountId: query.accountId,
        categoryId: query.categoryId,
        type: query.type,
        startDate: query.startDate ? new Date(query.startDate) : undefined,
        endDate: query.endDate ? new Date(query.endDate) : undefined,
        minAmount: query.minAmount,
        maxAmount: query.maxAmount,
        search: query.search,
      };

      const pagination = {
        limit: query.limit,
        cursor: query.cursor,
      };

      const transactions = await TransactionService.getTransactions(
        req.user!.userId,
        filters,
        pagination
      );

      return res.status(200).json({
        success: true,
        data: transactions,
      });

    } catch (error) {
      next(error);
    }
  };

  /* ------------------------------------------------ */
  /* UPDATE TRANSACTION */
  /* ------------------------------------------------ */

  static updateTransaction = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const { id } = transactionIdParamSchema.parse(req.params);
      const parsed = updateTransactionSchema.parse(req.body);

      const updateData = {
        ...parsed,
        transactionDate: parsed.transactionDate
          ? new Date(parsed.transactionDate)
          : undefined,
      };

      const transaction = await TransactionService.updateTransaction(
        id,
        req.user!.userId,
        updateData
      );

      return res.status(200).json({
        success: true,
        data: transaction,
      });

    } catch (error) {
      next(error);
    }
  };

  /* ------------------------------------------------ */
  /* DELETE TRANSACTION */
  /* ------------------------------------------------ */

  static deleteTransaction = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const { id } = transactionIdParamSchema.parse(req.params);

      await TransactionService.deleteTransaction(
        id,
        req.user!.userId
      );

      return res.status(200).json({
        success: true,
        message: "Transaction deleted successfully",
      });

    } catch (error) {
      next(error);
    }
  };
}