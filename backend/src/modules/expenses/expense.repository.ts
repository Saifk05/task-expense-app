import { prisma } from "../../config/prisma";

export class CategoryRepository {

  /* ------------------------------------------------ */
  /* CREATE CATEGORY (PARENT) */
  /* ------------------------------------------------ */

  static async createCategory(data: {
    name: string;
    type: any;
    userId: string | null;
    icon?: string | null;
    color?: string | null;
  }) {
    return prisma.category.create({
      data: {
        name: data.name,
        type: data.type,
        userId: data.userId,
        parentId: null,
        icon: data.icon ?? null,
        color: data.color ?? null,
      },
    });
  }

  /* ------------------------------------------------ */
  /* CREATE SUBCATEGORY */
  /* ------------------------------------------------ */

  static async createSubCategory(data: {
    name: string;
    type: any;
    userId: string | null;
    parentId: string;
    icon?: string | null;
    color?: string | null;
  }) {
    return prisma.category.create({
      data: {
        name: data.name,
        type: data.type,
        userId: data.userId,
        parentId: data.parentId,
        icon: data.icon ?? null,
        color: data.color ?? null,
      },
    });
  }

  /* ------------------------------------------------ */
  /* GET CATEGORY BY ID */
  /* ------------------------------------------------ */

  static async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  /* ------------------------------------------------ */
  /* GET CATEGORY TREE */
  /* ------------------------------------------------ */

  static async findCategoryTree(userId: string) {
    return prisma.category.findMany({
      where: {
        parentId: null,
        OR: [
          { userId: null }, // global categories
          { userId },       // user categories
        ],
      },
      include: {
        children: {
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  /* ------------------------------------------------ */
  /* UPDATE CATEGORY */
  /* ------------------------------------------------ */

  static async updateCategory(
    id: string,
    data: {
      name?: string;
      icon?: string | null;
      color?: string | null;
    }
  ) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  /* ------------------------------------------------ */
  /* DELETE CATEGORY */
  /* ------------------------------------------------ */

  static async deleteCategory(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }

  /* ------------------------------------------------ */
  /* CHECK TRANSACTIONS USING CATEGORY */
  /* ------------------------------------------------ */

  static async hasTransactions(categoryId: string) {
    const count = await prisma.transaction.count({
      where: {
        categoryId,
      },
    });

    return count > 0;
  }

  /* ------------------------------------------------ */
  /* FIND CHILDREN */
  /* ------------------------------------------------ */

  static async findChildren(parentId: string) {
    return prisma.category.findMany({
      where: { parentId },
    });
  }
}