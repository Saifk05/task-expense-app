import { Response, NextFunction } from "express";
import { AuthRequest } from "../../lib/middleware/auth.middleware";
import { AccountService } from "./account.service";
import {
  createAccountSchema,
  updateAccountSchema,
  accountIdParamSchema,
} from "./account.validation";

export class AccountController {

  /* ------------------------------------------------ */
  /* CREATE ACCOUNT */
  /* ------------------------------------------------ */

  static createAccount = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parsed = createAccountSchema.parse(req.body);

      const account = await AccountService.createAccount({
        userId: req.user!.userId,
        name: parsed.name,
        type: parsed.type,
        balance: parsed.balance,
      });

      res.status(201).json({
        success: true,
        data: account,
      });
    } catch (error) {
      next(error);
    }
  };

  /* ------------------------------------------------ */
  /* GET ACCOUNTS */
  /* ------------------------------------------------ */

  static getAccounts = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await AccountService.getAccounts(req.user!.userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /* ------------------------------------------------ */
  /* UPDATE ACCOUNT */
  /* ------------------------------------------------ */

  static updateAccount = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = accountIdParamSchema.parse(req.params);
      const parsed = updateAccountSchema.parse(req.body);

      const updatedAccount = await AccountService.updateAccount(
        id,
        req.user!.userId,
        parsed
      );

      res.status(200).json({
        success: true,
        data: updatedAccount,
      });
    } catch (error) {
      next(error);
    }
  };

  /* ------------------------------------------------ */
  /* DELETE ACCOUNT */
  /* ------------------------------------------------ */

  static deleteAccount = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = accountIdParamSchema.parse(req.params);

      await AccountService.deleteAccount(id, req.user!.userId);

      res.status(200).json({
        success: true,
        message: "Account deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}