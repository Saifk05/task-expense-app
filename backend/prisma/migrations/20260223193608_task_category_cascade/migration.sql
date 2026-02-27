-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TaskCategory" DROP CONSTRAINT "TaskCategory_parentId_fkey";

-- DropIndex
DROP INDEX "TaskCategory_parentId_idx";

-- CreateIndex
CREATE INDEX "TaskCategory_userId_parentId_idx" ON "TaskCategory"("userId", "parentId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TaskCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCategory" ADD CONSTRAINT "TaskCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TaskCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
