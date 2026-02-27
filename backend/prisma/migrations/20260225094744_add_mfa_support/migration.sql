-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isMfaEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mfaSecret" TEXT;
