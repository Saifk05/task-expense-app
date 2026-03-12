import { Router } from "express";
import { BudgetController } from "./budget.controller";
import authMiddleware from "../../lib/middleware/auth.middleware";

const budgetRoutes = Router();

budgetRoutes.post(
  "/budgets",
  authMiddleware,
  BudgetController.createBudget
);

budgetRoutes.get(
  "/budgets",
  authMiddleware,
  BudgetController.getBudgets
);

budgetRoutes.patch(
  "/budgets/:id",
  authMiddleware,
  BudgetController.updateBudget
);

budgetRoutes.delete(
  "/budgets/:id",
  authMiddleware,
  BudgetController.deleteBudget
);

export default budgetRoutes;