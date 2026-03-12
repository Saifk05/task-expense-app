import { Router } from "express";
import { AccountController } from "./account.controller";
import authMiddleware from "../../lib/middleware/auth.middleware";

const accountRoutes = Router();

/* ------------------------------------------------ */
/* CREATE ACCOUNT */
/* ------------------------------------------------ */

accountRoutes.post(
  "/accounts",
  authMiddleware,
  AccountController.createAccount
);

/* ------------------------------------------------ */
/* GET USER ACCOUNTS */
/* ------------------------------------------------ */

accountRoutes.get(
  "/accounts",
  authMiddleware,
  AccountController.getAccounts
);

/* ------------------------------------------------ */
/* UPDATE ACCOUNT */
/* ------------------------------------------------ */

accountRoutes.patch(
  "/accounts/:id",
  authMiddleware,
  AccountController.updateAccount
);

/* ------------------------------------------------ */
/* DELETE ACCOUNT */
/* ------------------------------------------------ */

accountRoutes.delete(
  "/accounts/:id",
  authMiddleware,
  AccountController.deleteAccount
);

export default accountRoutes;