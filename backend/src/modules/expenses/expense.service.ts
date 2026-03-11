import { CategoryRepository } from "./expense.repository";
import { CategoryType } from "@prisma/client";
import { normalizeCategoryName } from "../../lib/utils/category-icon.util";
import { ErrorCode } from "../../lib/errors/error-codes";

export class CategoryService {

  /* ------------------------------------------------ */
  /* CREATE CATEGORY */
  /* ------------------------------------------------ */

  static async createCategory(input: {
    userId: string;
    name: string;
    type: CategoryType;
    icon?: string;
    color?: string;
  }) {
    const name = normalizeCategoryName(input.name);

    const category = await CategoryRepository.createCategory({
      name,
      type: input.type,
      userId: input.userId,
      icon: input.icon ?? null,
      color: input.color ?? null,
    });

    return category;
  }

  /* ------------------------------------------------ */
  /* CREATE SUBCATEGORY */
  /* ------------------------------------------------ */

  static async createSubCategory(input: {
    userId: string;
    parentId: string;
    name: string;
    icon?: string;
    color?: string;
  }) {
    const parent = await CategoryRepository.findById(input.parentId);

    if (!parent) {
      throw new Error(ErrorCode.CATEGORY_NOT_FOUND);
    }

    if (parent.parentId !== null) {
      throw new Error("Subcategories cannot have children");
    }

    const name = normalizeCategoryName(input.name);

    const subCategory = await CategoryRepository.createSubCategory({
      name,
      type: parent.type,
      userId: input.userId,
      parentId: parent.id,
      icon: input.icon ?? null,
      color: input.color ?? null,
    });

    return subCategory;
  }

  /* ------------------------------------------------ */
  /* GET CATEGORY TREE */
  /* ------------------------------------------------ */

  static async getCategories(userId: string) {
    const categories = await CategoryRepository.findCategoryTree(userId);
    return categories;
  }

  /* ------------------------------------------------ */
  /* UPDATE CATEGORY */
  /* ------------------------------------------------ */

  static async updateCategory(input: {
    id: string;
    name?: string;
    icon?: string;
    color?: string;
  }) {
    const category = await CategoryRepository.findById(input.id);

    if (!category) {
      throw new Error(ErrorCode.CATEGORY_NOT_FOUND);
    }

    if (!category.userId) {
      throw new Error(ErrorCode.DEFAULT_CATEGORY_MODIFICATION_FORBIDDEN);
    }

    const data: any = {};

    if (input.name) {
      data.name = normalizeCategoryName(input.name);
    }

    if (input.icon !== undefined) {
      data.icon = input.icon;
    }

    if (input.color !== undefined) {
      data.color = input.color;
    }

    const updated = await CategoryRepository.updateCategory(input.id, data);

    return updated;
  }

  /* ------------------------------------------------ */
  /* DELETE CATEGORY */
  /* ------------------------------------------------ */

  static async deleteCategory(id: string) {
    const category = await CategoryRepository.findById(id);

    if (!category) {
      throw new Error(ErrorCode.CATEGORY_NOT_FOUND);
    }

    if (!category.userId) {
      throw new Error(ErrorCode.DEFAULT_CATEGORY_MODIFICATION_FORBIDDEN);
    }

    const hasTransactions = await CategoryRepository.hasTransactions(id);

    if (hasTransactions) {
      throw new Error(ErrorCode.CATEGORY_HAS_TRANSACTIONS);
    }

    await CategoryRepository.deleteCategory(id);

    return true;
  }
}