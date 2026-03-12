/* ------------------------------------------------ */
/* CREATE BUDGET INPUT */
/* ------------------------------------------------ */

export interface CreateBudgetInput {
  userId: string;
  categoryId: string;

  amountLimit: number;

  startDate: Date;
  endDate: Date;

  thresholdPercentage?: number;
}

/* ------------------------------------------------ */
/* UPDATE BUDGET INPUT */
/* ------------------------------------------------ */

export interface UpdateBudgetInput {
  amountLimit?: number;

  startDate?: Date;
  endDate?: Date;

  thresholdPercentage?: number;

  isActive?: boolean;
}

/* ------------------------------------------------ */
/* BUDGET FILTERS */
/* ------------------------------------------------ */

export interface BudgetFilters {
  categoryId?: string;

  startDate?: Date;
  endDate?: Date;

  isActive?: boolean;
}

/* ------------------------------------------------ */
/* BUDGET PAGINATION */
/* ------------------------------------------------ */

export interface BudgetPagination {
  limit?: number;
  cursor?: string;
}

/* ------------------------------------------------ */
/* BUDGET STATUS */
/* ------------------------------------------------ */

export type BudgetStatus =
  | "SAFE"
  | "WARNING"
  | "EXCEEDED";

/* ------------------------------------------------ */
/* BUDGET USAGE */
/* ------------------------------------------------ */

export interface BudgetUsage {
  budgetId: string;

  limit: number;
  spent: number;
  remaining: number;

  percentageUsed: number;

  status: BudgetStatus;
}

/* ------------------------------------------------ */
/* BUDGET ALERT */
/* ------------------------------------------------ */

export interface BudgetAlert {
  shouldNotify: boolean;

  type?: "BUDGET_WARNING" | "BUDGET_EXCEEDED";

  percentageUsed?: number;
}

/* ------------------------------------------------ */
/* BUDGET SUMMARY */
/* ------------------------------------------------ */

export interface BudgetSummary {
  totalLimit: number;
  totalSpent: number;
  totalRemaining: number;
}