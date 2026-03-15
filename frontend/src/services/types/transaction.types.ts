export interface CreateTransactionPayload {
  accountId: string;
  categoryId: string;
  title: string;
  description: string;
  type: "INCOME" | "EXPENSE";
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  transactionDate: string;
}


export interface UpdateTransactionPayload {
  title?: string;
  description?: string;
  type?: "INCOME" | "EXPENSE";
  quantity?: number;
  unitPrice?: number;
  totalAmount?: number;
  transactionDate?: string;
  categoryId?: string;
  accountId?: string;
}