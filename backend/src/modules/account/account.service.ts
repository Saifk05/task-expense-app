import { AccountRepository } from "./account.repository";
import { AccountType } from "@prisma/client";
import { ErrorCode } from "../../lib/errors/error-codes";

export class AccountService {

  /* ------------------------------------------------ */
  /* CREATE ACCOUNT */
  /* ------------------------------------------------ */

  static async createAccount(input: {
    userId: string;
    name: string;
    type: AccountType;
    balance: number;
  }) {

    const normalizedName = input.name.trim();

    const existingAccounts = await AccountRepository.getAccounts(input.userId);

    const duplicate = existingAccounts.find(
      (acc) => acc.name.toLowerCase() === normalizedName.toLowerCase()
    );

    if (duplicate) {
      throw new Error(ErrorCode.CONFLICT);
    }

    const account = await AccountRepository.createAccount({
      userId: input.userId,
      name: normalizedName,
      type: input.type,
      balance: input.balance,
    });

    return account;
  }

  /* ------------------------------------------------ */
  /* GET ACCOUNTS */
  /* ------------------------------------------------ */

  static async getAccounts(userId: string) {

  const accounts = await AccountRepository.getAccounts(userId);

  const summary = await AccountRepository.getAccountSummary(userId);

  return {
    accounts,
    summary,
  };
}

  /* ------------------------------------------------ */
  /* UPDATE ACCOUNT */
  /* ------------------------------------------------ */

  static async updateAccount(
    id: string,
    userId: string,
    data: {
      name?: string;
      type?: AccountType;
      balance?: number;
      isActive?: boolean;
    }
  ) {

    const account = await AccountRepository.findById(id);

    if (!account) {
      throw new Error(ErrorCode.ACCOUNT_NOT_FOUND);
    }

    if (account.userId !== userId) {
      throw new Error(ErrorCode.FORBIDDEN);
    }

    if (data.name) {

      const normalizedName = data.name.trim();

      const existingAccounts = await AccountRepository.getAccounts(userId);

      const duplicate = existingAccounts.find(
        (acc) =>
          acc.name.toLowerCase() === normalizedName.toLowerCase() &&
          acc.id !== id
      );

      if (duplicate) {
        throw new Error(ErrorCode.CONFLICT);
      }

      data.name = normalizedName;
    }

    const updated = await AccountRepository.updateAccount(id, data);

    return updated;
  }

  /* ------------------------------------------------ */
  /* DELETE ACCOUNT */
  /* ------------------------------------------------ */

  static async deleteAccount(id: string, userId: string) {

    const account = await AccountRepository.findById(id);

    if (!account) {
      throw new Error(ErrorCode.ACCOUNT_NOT_FOUND);
    }

    if (account.userId !== userId) {
      throw new Error(ErrorCode.FORBIDDEN);
    }

    await AccountRepository.deleteAccount(id);

    return true;
  }
}