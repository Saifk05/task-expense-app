import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import authMiddleware from "../../lib/middleware/auth.middleware";

const transactionRoutes = Router();

/* ------------------------------------------------ */
/* CREATE TRANSACTION */
/* ------------------------------------------------ */

transactionRoutes.post(
    
  "/transactions",
  authMiddleware,
  TransactionController.createTransaction
);

/* ------------------------------------------------ */
/* GET TRANSACTIONS */
/* ------------------------------------------------ */

transactionRoutes.get(
  "/transactions",
  authMiddleware,
  TransactionController.getTransactions
);

/* ------------------------------------------------ */
/* UPDATE TRANSACTION */
/* ------------------------------------------------ */

transactionRoutes.patch(
  "/transactions/:id",
  authMiddleware,
  TransactionController.updateTransaction
);

/* ------------------------------------------------ */
/* DELETE TRANSACTION */
/* ------------------------------------------------ */

transactionRoutes.delete(
  "/transactions/:id",
  authMiddleware,
  TransactionController.deleteTransaction
);

export default transactionRoutes;