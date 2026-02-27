// -----------------------------------------------------------------------------
// Task Dashboard Response Types
// -----------------------------------------------------------------------------

// Date range used in dashboard (default last 15 days or custom)
export interface DateRange {
  from: string; // ISO date string
  to: string;   // ISO date string
}

// Weekly summary section
export interface WeeklySummary {
  totalTasks: number;
  completionRate: number; // percentage (0–100)
}

// Generic percentage wrapper
export interface PercentageMetric {
  percentage: number; // 0–100
}

// Task metrics section (all percentage-based)
export interface TaskMetrics {
  completed: PercentageMetric;
  pending: PercentageMetric;
  inProgress: PercentageMetric;
  cancelled: PercentageMetric;
  overdue: PercentageMetric;
}

// Weekly activity graph item
export interface WeeklyActivityItem {
  date: string; // ISO date string
  count: number; // number of tasks for that date
}

// Pie chart distribution (Completed vs Cancelled)
export interface StatusDistribution {
  completedPercentage: number;
  cancelledPercentage: number;
}

// Final dashboard response structure
export interface TaskDashboardResponse {
  firstName: string;

  range: DateRange;

  weeklySummary: WeeklySummary;

  taskMetrics: TaskMetrics;

  weeklyActivity: WeeklyActivityItem[];

  statusDistribution: StatusDistribution;
}