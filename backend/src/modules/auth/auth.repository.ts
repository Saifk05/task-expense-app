import { prisma } from "../../init/prisma.init";

interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
}


class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async createUser(data: CreateUserInput) {
    return prisma.user.create({
      data,
    });
  }

  async updateUser(userId: string, data: any) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  }


  async updateRefreshToken(
    userId: string,
    refreshTokenHash: string | null
  ) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        currentRefreshTokenHash: refreshTokenHash,
      },
    });
  }

  async incrementFailedAttempts(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: {
          increment: 1,
        },
      },
    });
  }

  async lockAccount(userId: string, lockUntil: Date) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        isAccountLocked: true,
        lockUntil,
      },
    });
  }

  async resetFailedAttempts(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: 0,
        isAccountLocked: false,
        lockUntil: null,
      },
    });
  }
}

export default new AuthRepository();
