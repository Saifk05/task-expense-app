import { BudgetRepository } from "./budget.repository";
import {
  CreateBudgetInput,
  UpdateBudgetInput,
  BudgetFilters,
  BudgetPagination,
  BudgetUsage,
  BudgetAlert,
} from "./budget.types";
import { ErrorCode } from "../../lib/errors/error-codes";

export class BudgetService {

  static async createBudget(input: CreateBudgetInput) {

    const existing = await BudgetRepository.findActiveBudget(
      input.userId,
      input.categoryId,
      input.startDate
    );

    if (existing) {
      throw new Error(ErrorCode.BUDGET_ALREADY_EXISTS);
    }

    return BudgetRepository.createBudget(input);
  }

  static async getBudgets(
    userId: string,
    filters: BudgetFilters,
    pagination: BudgetPagination
  ) {
    return BudgetRepository.getBudgets(userId, filters, pagination);
  }

  static async updateBudget(
    id: string,
    userId: string,
    data: UpdateBudgetInput
  ) {

    const budget = await BudgetRepository.findById(id);

    if (!budget) {
      throw new Error(ErrorCode.BUDGET_NOT_FOUND);
    }

    if (budget.userId !== userId) {
      throw new Error(ErrorCode.FORBIDDEN);
    }

    return BudgetRepository.updateBudget(id, data);
  }

  static async deleteBudget(id: string, userId: string) {

    const budget = await BudgetRepository.findById(id);

    if (!budget) {
      throw new Error(ErrorCode.BUDGET_NOT_FOUND);
    }

    if (budget.userId !== userId) {
      throw new Error(ErrorCode.FORBIDDEN);
    }

    return BudgetRepository.deleteBudget(id);
  }

  static async getBudgetUsage(
    userId: string,
    categoryId: string,
    date: Date
  ): Promise<BudgetUsage | null> {

    const budget = await BudgetRepository.findActiveBudget(
      userId,
      categoryId,
      date
    );

    if (!budget) {
      return null;
    }

    const spent = await BudgetRepository.getBudgetSpending(
      userId,
      categoryId,
      budget.startDate,
      budget.endDate
    );

    const limit = Number(budget.amountLimit);
    const remaining = limit - spent;
    const percentageUsed = (spent / limit) * 100;

    let status: "SAFE" | "WARNING" | "EXCEEDED" = "SAFE";

    if (percentageUsed >= 100) {
      status = "EXCEEDED";
    } else if (
      budget.thresholdPercentage &&
      percentageUsed >= budget.thresholdPercentage
    ) {
      status = "WARNING";
    }

    return {
      budgetId: budget.id,
      limit,
      spent,
      remaining,
      percentageUsed,
      status,
    };
  }

  static async checkBudgetAlert(
    userId: string,
    categoryId: string,
    date: Date
  ): Promise<BudgetAlert> {

    const usage = await this.getBudgetUsage(userId, categoryId, date);

    if (!usage) {
      return { shouldNotify: false };
    }

    if (usage.status === "EXCEEDED") {
      return {
        shouldNotify: true,
        type: "BUDGET_EXCEEDED",
        percentageUsed: usage.percentageUsed,
      };
    }

    if (usage.status === "WARNING") {
      return {
        shouldNotify: true,
        type: "BUDGET_WARNING",
        percentageUsed: usage.percentageUsed,
      };
    }

    return { shouldNotify: false };
  }
}