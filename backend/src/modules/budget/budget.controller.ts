import { Response, NextFunction } from "express";
import { AuthRequest } from "../../lib/middleware/auth.middleware";
import { BudgetService } from "./budget.service";
import {
  createBudgetSchema,
  updateBudgetSchema,
  budgetIdParamSchema,
  budgetQuerySchema,
} from "./budget.validation";

export class BudgetController {

  static createBudget = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parsed = createBudgetSchema.parse(req.body);

      const budget = await BudgetService.createBudget({
        userId: req.user!.userId,
        categoryId: parsed.categoryId,
        amountLimit: parsed.amountLimit,
        startDate: new Date(parsed.startDate),
        endDate: new Date(parsed.endDate),
        thresholdPercentage: parsed.thresholdPercentage,
      });

      return res.status(201).json({
        success: true,
        data: budget,
      });
    } catch (error) {
      next(error);
    }
  };

  static getBudgets = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = budgetQuerySchema.parse(req.query);

      const filters = {
        categoryId: query.categoryId,
        isActive: query.isActive,
        startDate: query.startDate ? new Date(query.startDate) : undefined,
        endDate: query.endDate ? new Date(query.endDate) : undefined,
      };

      const pagination = {
        limit: query.limit,
        cursor: query.cursor,
      };

      const budgets = await BudgetService.getBudgets(
        req.user!.userId,
        filters,
        pagination
      );

      return res.status(200).json({
        success: true,
        data: budgets,
      });
    } catch (error) {
      next(error);
    }
  };

  static updateBudget = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = budgetIdParamSchema.parse(req.params);
      const parsed = updateBudgetSchema.parse(req.body);

      const updateData = {
        ...parsed,
        startDate: parsed.startDate ? new Date(parsed.startDate) : undefined,
        endDate: parsed.endDate ? new Date(parsed.endDate) : undefined,
      };

      const budget = await BudgetService.updateBudget(
        id,
        req.user!.userId,
        updateData
      );

      return res.status(200).json({
        success: true,
        data: budget,
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteBudget = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = budgetIdParamSchema.parse(req.params);

      await BudgetService.deleteBudget(
        id,
        req.user!.userId
      );

      return res.status(200).json({
        success: true,
        message: "Budget deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}