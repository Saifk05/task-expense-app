import { Response, NextFunction } from "express";
import { AuthRequest } from "../../lib/middleware/auth.middleware";
import { CategoryRepository } from "./expense.repository";
import {
  createCategorySchema,
  createSubCategorySchema,
  updateCategorySchema,
  categoryIdParamSchema,
  idParamSchema,
} from "./expense.validation";
import { CategoryType } from "@prisma/client";
import { ErrorCode } from "../../lib/errors/error-codes";
import {
  generateCategoryIcon,
  generateCategoryColor,
} from "../../lib/utils/category-icon.util";
import { detectCategoryType } from "../../lib/utils/category-type.util";


export class CategoryController {

  /* ------------------------------------------------ */
  /* CREATE CATEGORY */
  /* ------------------------------------------------ */

static async createCategory(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.userId;

    const data = createCategorySchema.parse(req.body);

    const name = data.name.trim();

    const type = detectCategoryType(name);

    const icon = generateCategoryIcon(name);

    const color = generateCategoryColor(name);

    const category = await CategoryRepository.createCategory({
      name,
      type,
      userId,
      icon,
      color,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

  /* ------------------------------------------------ */
  /* CREATE SUBCATEGORY */
  /* ------------------------------------------------ */

  static async createSubCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const { categoryId } = categoryIdParamSchema.parse(req.params);
      const data = createSubCategorySchema.parse(req.body);

      const parent = await CategoryRepository.findById(categoryId);

      if (!parent) {
        return res.status(404).json({
          success: false,
          error: ErrorCode.CATEGORY_NOT_FOUND,
        });
      }

      if (parent.parentId !== null) {
        return res.status(400).json({
          success: false,
          error: "Subcategories cannot have children",
        });
      }

      const subCategory = await CategoryRepository.createSubCategory({
        name: data.name,
        type: parent.type,
        userId,
        parentId: parent.id,
        icon: data.icon,
        color: data.color,
      });

      res.status(201).json({
        success: true,
        data: subCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  /* ------------------------------------------------ */
  /* GET CATEGORY TREE */
  /* ------------------------------------------------ */

  static async getCategories(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.userId;

      const categories = await CategoryRepository.findCategoryTree(userId);

      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  /* ------------------------------------------------ */
  /* UPDATE CATEGORY */
  /* ------------------------------------------------ */

  static async updateCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = updateCategorySchema.parse(req.body);

      const category = await CategoryRepository.findById(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          error: ErrorCode.CATEGORY_NOT_FOUND,
        });
      }

      if (!category.userId) {
        return res.status(403).json({
          success: false,
          error: ErrorCode.DEFAULT_CATEGORY_MODIFICATION_FORBIDDEN,
        });
      }

      const updated = await CategoryRepository.updateCategory(id, data);

      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  /* ------------------------------------------------ */
  /* DELETE CATEGORY */
  /* ------------------------------------------------ */

  static async deleteCategory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const category = await CategoryRepository.findById(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          error: ErrorCode.CATEGORY_NOT_FOUND,
        });
      }

      if (!category.userId) {
        return res.status(403).json({
          success: false,
          error: ErrorCode.DEFAULT_CATEGORY_MODIFICATION_FORBIDDEN,
        });
      }

      const hasTransactions = await CategoryRepository.hasTransactions(id);

      if (hasTransactions) {
        return res.status(409).json({
          success: false,
          error: ErrorCode.CATEGORY_HAS_TRANSACTIONS,
        });
      }

      await CategoryRepository.deleteCategory(id);

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}