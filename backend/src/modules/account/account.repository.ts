import { prisma } from "../../config/prisma";
import { AccountType } from "@prisma/client";

export class AccountRepository {

  /* ------------------------------------------------ */
  /* CREATE ACCOUNT */
  /* ------------------------------------------------ */

  static async createAccount(data: {
    userId: string;
    name: string;
    type: AccountType;
    balance: number;
  }) {
    return prisma.account.create({
      data: {
        userId: data.userId,
        name: data.name,
        type: data.type,
        balance: data.balance,
      },
    });
  }

  /* ------------------------------------------------ */
  /* GET USER ACCOUNTS */
  /* ------------------------------------------------ */

  static async getAccounts(userId: string) {
    return prisma.account.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /* ------------------------------------------------ */
  /* FIND ACCOUNT BY ID */
  /* ------------------------------------------------ */

  static async findById(id: string) {
    return prisma.account.findUnique({
      where: { id },
    });
  }

  /* ------------------------------------------------ */
  /* UPDATE ACCOUNT */
  /* ------------------------------------------------ */

  static async updateAccount(
    id: string,
    data: {
      name?: string;
      type?: AccountType;
      balance?: number;
      isActive?: boolean;
    }
  ) {
    return prisma.account.update({
      where: { id },
      data,
    });
  }

  /* ------------------------------------------------ */
  /* DELETE ACCOUNT (SOFT DELETE) */
  /* ------------------------------------------------ */

  static async deleteAccount(id: string) {
    return prisma.account.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}