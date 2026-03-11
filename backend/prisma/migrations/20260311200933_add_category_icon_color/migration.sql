-- DropIndex
DROP INDEX "Category_userId_name_parentId_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "color" TEXT,
ADD COLUMN     "icon" TEXT;
