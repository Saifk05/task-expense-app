import { prisma } from "../../config/prisma";
import { Prisma } from "@prisma/client";

export class UserRepository {
  async findOverviewById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        profilePictureUrl: true,
        address: true,
        city: true,
        pincode: true,
      },
    });

    if (!user) return null;

    const unreadNotifications = await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

    const addressComplete =
      !!user.address &&
      !!user.city &&
      !!user.pincode;

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl,
      unreadNotifications,
      addressComplete,
    };
  }

async updateAddress(userId: string, data: {
  address: string;
  building?: string;
  locality?: string;
  city: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      address: data.address,
      building: data.building,
      locality: data.locality,
      city: data.city,
      pincode: data.pincode,
      latitude: data.latitude !== undefined
        ? new Prisma.Decimal(data.latitude)
        : undefined,
      longitude: data.longitude !== undefined
        ? new Prisma.Decimal(data.longitude)
        : undefined,
    },
    select: {
      address: true,
      building: true,
      locality: true,
      city: true,
      pincode: true,
      latitude: true,
      longitude: true,
    },
  });
}

async findAddressByUserId(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      address: true,
      building: true,
      locality: true,
      city: true,
      pincode: true,
      latitude: true,
      longitude: true,
    },
  });
}

async findPasswordByUserId(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      passwordHash: true,
    },
  });
}

async updatePassword(userId: string, newPasswordHash: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash: newPasswordHash,
      currentRefreshTokenHash: null, // invalidate sessions (recommended)
    },
  });
}

}