import { TransactionType } from "@prisma/client";

export interface CreateTransactionInput {
  userId: string;
  accountId: string;
  categoryId: string;

  title: string;
  description?: string;

  type: TransactionType;

  quantity?: number;
  unitPrice?: number;
  totalAmount: number;

  transactionDate: Date;
}

export interface UpdateTransactionInput {
  title?: string;
  description?: string;

  categoryId?: string;
  accountId?: string;

  quantity?: number;
  unitPrice?: number;
  totalAmount?: number;

  transactionDate?: Date;
}

export interface TransactionFilters {
  accountId?: string;
  categoryId?: string;
  type?: TransactionType;

  startDate?: Date;
  endDate?: Date;

  minAmount?: number;
  maxAmount?: number;

  search?: string;
}

export interface PaginationOptions {
  limit?: number;
  cursor?: string;
}

export interface TransactionListResponse {
  data: any[];
  nextCursor?: string;
}