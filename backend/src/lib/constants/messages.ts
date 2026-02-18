export const MESSAGES = {
  USER: {
    NOT_FOUND: "User not found",
    ALREADY_EXISTS: "User already exists",
    ACCOUNT_LOCKED: "Your account is locked",
    ACCOUNT_DISABLED: "Your account is disabled",
  },

  AUTH: {
    INVALID_CREDENTIALS: "Invalid email or password",
    INVALID_TOKEN: "Invalid or expired token",
    TOKEN_MISSING: "Authentication token missing",
  },

  TASK: {
    NOT_FOUND: "Task not found",
    ALREADY_UPDATED: "Task already updated",
    CANNOT_CANCEL: "You cannot cancel this task",
  },

  ACCOUNT: {
    NOT_FOUND: "Account not found",
    INACTIVE: "Account is inactive",
  },

  TRANSACTION: {
    NOT_FOUND: "Transaction not found",
    DUPLICATE: "Transaction already exists",
  },

  BUDGET: {
    NOT_FOUND: "Budget not found",
    EXCEEDED: "Budget limit exceeded",
  },

  COMMON: {
    INTERNAL_SERVER_ERROR: "Server error. Please try later.",
    FORBIDDEN: "You are not allowed to perform this action",
  },
} as const;
