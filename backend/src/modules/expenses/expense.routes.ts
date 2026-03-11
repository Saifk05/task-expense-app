import { Router } from "express";
import { CategoryController } from "./expense.controller";
import authMiddleware from "../../lib/middleware/auth.middleware";

const categoryRoutes = Router();

/* ------------------------------------------------ */
/* CREATE CATEGORY */
/* ------------------------------------------------ */

categoryRoutes.post(
  "/categories",
  authMiddleware,
  CategoryController.createCategory
);

/* ------------------------------------------------ */
/* CREATE SUBCATEGORY */
/* ------------------------------------------------ */

categoryRoutes.post(
  "/categories/:categoryId/subcategories",
  authMiddleware,
  CategoryController.createSubCategory
);

/* ------------------------------------------------ */
/* GET CATEGORIES TREE */
/* ------------------------------------------------ */

categoryRoutes.get(
  "/categories",
  authMiddleware,
  CategoryController.getCategories
);

/* ------------------------------------------------ */
/* UPDATE CATEGORY */
/* ------------------------------------------------ */

categoryRoutes.patch(
  "/categories/:id",
  authMiddleware,
  CategoryController.updateCategory
);

/* ------------------------------------------------ */
/* DELETE CATEGORY */
/* ------------------------------------------------ */

categoryRoutes.delete(
  "/categories/:id",
  authMiddleware,
  CategoryController.deleteCategory
);

export default categoryRoutes;