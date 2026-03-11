import authRepository from "./auth.repository";
import { RegisterInput, LoginInput } from "./auth.validation";
import { hashPassword, comparePassword } from "../../lib/utils/hash.util";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  TokenPayload,
} from "../../lib/authentication/jwt.util";
import { AppError } from "../../lib/errors/app-error";
import { ErrorCode } from "../../lib/errors/error-codes";
import { MESSAGES } from "../../lib/constants/messages";
import cloudinary from "../../config/cloudinary";
import streamifier from "streamifier";
import { prisma } from "../../init/prisma.init";
import { DEFAULT_TASK_CATEGORIES } from "../../lib/utils/default-task-categories";
import bcrypt from "bcrypt";

class AuthService {
async register(data: RegisterInput) {
  const existingUser = await authRepository.findUserByEmail(data.email);

  if (existingUser) {
    throw new AppError(
      MESSAGES.USER.ALREADY_EXISTS,
      409,
      ErrorCode.CONFLICT
    );
  }

  const passwordHash = await hashPassword(data.password);

  // const user = await prisma.$transaction(async (tx) => {

/* 1️⃣ CREATE USER */
const user = await prisma.user.create({
  data: {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    phoneNumber: data.phoneNumber ?? null,
    passwordHash,
  },
});

/* 2️⃣ SEED DEFAULT TASK CATEGORIES */
for (const category of DEFAULT_TASK_CATEGORIES) {
  const parent = await prisma.taskCategory.create({
    data: {
      userId: user.id,
      name: category.name.trim(),
      parentId: null,
      icon: category.icon ?? null,
      color: category.color ?? null,
    },
  });

  if (category.subCategories?.length) {
    for (const sub of category.subCategories) {
      await prisma.taskCategory.create({
        data: {
          userId: user.id,
          name: sub.name.trim(),
          parentId: parent.id,
        },
      });
    }
  }
}

//   /* ============================= */
//     /* 1️⃣ CREATE USER */
//     /* ============================= */
//     const newUser = await tx.user.create({
//       data: {
//         firstName: data.firstName.trim(),
//         lastName: data.lastName.trim(),
//         email: data.email.trim().toLowerCase(),
//         phoneNumber: data.phoneNumber ?? null,
//         passwordHash,
//       },
//     });

//     /* ============================= */
//     /* 2️⃣ SEED DEFAULT TASK CATEGORIES (FLAT ONLY) */
//     /* ============================= */
// for (const category of DEFAULT_TASK_CATEGORIES) {
//   const parent = await tx.taskCategory.create({
//     data: {
//       userId: newUser.id,
//       name: category.name.trim(),
//       parentId: null,
//       icon: category.icon ?? null,   // only parent gets icon
//       color: category.color ?? null, // only parent gets color
//     },
//   });

//   if (category.subCategories?.length) {
//     for (const sub of category.subCategories) {
//       await tx.taskCategory.create({
//         data: {
//           userId: newUser.id,
//           name: sub.name.trim(),
//           parentId: parent.id,
//         },
//       });
//     }
//   }
// }

//     return newUser;
//   });

  /* ============================= */
  /* 3️⃣ GENERATE TOKENS */
  /* ============================= */
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await authRepository.updateRefreshToken(user.id, refreshTokenHash);

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
}
  async login(data: LoginInput) {
    const user = await authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new AppError(
        MESSAGES.AUTH.INVALID_CREDENTIALS,
        401,
        ErrorCode.UNAUTHORIZED
      );
    }

    if (!user.isActive) {
      throw new AppError(
        MESSAGES.USER.ACCOUNT_DISABLED,
        403,
        ErrorCode.FORBIDDEN
      );
    }

    // Check if account is locked and if lock expired
    if (user.isAccountLocked) {
      if (user.lockUntil && new Date() > user.lockUntil) {
        await authRepository.resetFailedAttempts(user.id);
      } else {
        throw new AppError(
          MESSAGES.USER.ACCOUNT_LOCKED,
          403,
          ErrorCode.FORBIDDEN
        );
      }
    }

    const isPasswordValid = await comparePassword(
      data.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      const updatedUser = await authRepository.incrementFailedAttempts(
        user.id
      );

      if (updatedUser.failedLoginAttempts >= 5) {
        const lockUntil = new Date(Date.now() + 5 * 60 * 1000);

        await authRepository.lockAccount(user.id, lockUntil);
      }

      throw new AppError(
        MESSAGES.AUTH.INVALID_CREDENTIALS,
        401,
        ErrorCode.UNAUTHORIZED
      );
    }

    await authRepository.resetFailedAttempts(user.id);

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    await authRepository.updateRefreshToken(user.id, refreshToken);

    // const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    // await authRepository.updateRefreshToken(user.id, refreshTokenHash);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }


async getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      gender: true,
      dateOfBirth: true,
      profilePictureUrl: true, // ✅ Added
    },
  });

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      ErrorCode.NOT_FOUND
    );
  }

  return user;
}

async refreshToken(refreshToken: string) {
  let decoded: TokenPayload;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(
      MESSAGES.AUTH.INVALID_TOKEN,
      401,
      ErrorCode.UNAUTHORIZED
    );
  }

  const user = await authRepository.findUserById(decoded.userId);

  if (!user || !user.currentRefreshTokenHash) {
    throw new AppError(
      MESSAGES.AUTH.INVALID_TOKEN,
      401,
      ErrorCode.UNAUTHORIZED
    );
  }

  // ✅ RAW TOKEN COMPARISON (since testing)
  if (refreshToken !== user.currentRefreshTokenHash) {
    throw new AppError(
      MESSAGES.AUTH.INVALID_TOKEN,
      401,
      ErrorCode.UNAUTHORIZED
    );
  }

  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
  };

  // 🔥 Generate NEW tokens
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  await authRepository.updateRefreshToken(
    user.id,
    newRefreshToken
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
}

  async logout(userId: string) {
    await authRepository.updateRefreshToken(userId, null);
    return true;
  }

async updateProfile(userId: string, data: any) {
  if (!userId) {
    throw new AppError(
      "Unauthorized",
      401,
      ErrorCode.UNAUTHORIZED
    );
  }

  const allowedFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "gender",
    "dateOfBirth",
    "address",
    "building",
    "locality",
    "city",
    "pincode",
    "latitude",
    "longitude",
  ];

  const updateData: any = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      if (field === "dateOfBirth" && data[field]) {
        // Convert string to Date object for Prisma
        updateData[field] = new Date(data[field]);
      } else {
        updateData[field] = data[field];
      }
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new AppError(
      "No valid fields provided for update",
      400,
      ErrorCode.VALIDATION_ERROR
    );
  }

  const updatedUser = await authRepository.updateUser(
    userId,
    updateData
  );

  return {
    id: updatedUser.id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    phoneNumber: updatedUser.phoneNumber,
    gender: updatedUser.gender,
    dateOfBirth: updatedUser.dateOfBirth,
    address: updatedUser.address,
    building: updatedUser.building,
    locality: updatedUser.locality,
    city: updatedUser.city,
    pincode: updatedUser.pincode,
    latitude: updatedUser.latitude,
    longitude: updatedUser.longitude,
  };
}

async uploadProfileImage(userId: string, file: Express.Multer.File) {
  if (!file) {
    throw new AppError("No file uploaded", 400, ErrorCode.VALIDATION_ERROR);
  }

  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
  }

  // sanitize first name (remove spaces & special chars)
  const safeFirstName = user.firstName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const result = await new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "profile_pictures",
        public_id: `${userId}_${safeFirstName}`, // 👈 userId + firstName
        overwrite: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });

  await authRepository.updateUser(userId, {
    profilePictureUrl: result.secure_url,
    profilePictureId: result.public_id,
  });

  return {
    profilePictureUrl: result.secure_url,
  };
}


}

export default new AuthService();
