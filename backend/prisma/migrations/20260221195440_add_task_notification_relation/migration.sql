/*
  Warnings:

  - The values [OVERDUE] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `startDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `dueDate` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "public"."TaskStatus_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "relatedTaskId" TEXT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "dueDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePictureId" TEXT;

-- CreateIndex
CREATE INDEX "Notification_relatedTaskId_idx" ON "Notification"("relatedTaskId");

-- CreateIndex
CREATE INDEX "Task_userId_startDate_idx" ON "Task"("userId", "startDate");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_relatedTaskId_fkey" FOREIGN KEY ("relatedTaskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
