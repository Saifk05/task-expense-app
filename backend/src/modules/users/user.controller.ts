import { Response, NextFunction } from "express";
import { AuthRequest } from "../../lib/middleware/auth.middleware";
import { UserService } from "./user.service";
import {
  updateAddressSchema,
  searchLocationSchema,
  reverseGeocodeSchema,
  changePasswordSchema,
} from "./user.validation";

export class UserController {
  private userService = new UserService();

  /**
   * GET /user/overview
   */
  getOverview = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const data = await this.userService.getOverview(
        req.user.userId
      );

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * PUT /user/address
   */
  updateAddress = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const parsed = updateAddressSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          errors: parsed.error.flatten(),
        });
      }

      const data = await this.userService.updateAddress(
        req.user.userId,
        parsed.data
      );

      return res.status(200).json({
        success: true,
        message: "Address updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /user/address/search
   */
  searchLocation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parsed = searchLocationSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          errors: parsed.error.flatten(),
        });
      }

      const data = await this.userService.searchLocation(
        parsed.data.name
      );

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /user/address/reverse
   */
  reverseGeocode = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parsed = reverseGeocodeSchema.safeParse({
        coords: req.headers["coords"],
      });

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          errors: parsed.error.flatten(),
        });
      }

      const [lat, lng] = parsed.data.coords.split(",");

      const data = await this.userService.reverseGeocode(
        lat,
        lng
      );

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "No address found",
        });
      }

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /user/address
   */
  getAddress = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const data = await this.userService.getAddress(
        req.user.userId
      );

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * PATCH /user/change-password
   */
  changePassword = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const parsed = changePasswordSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          errors: parsed.error.flatten(),
        });
      }

      await this.userService.changePassword(
        req.user.userId,
        parsed.data.currentPassword,
        parsed.data.newPassword
      );

      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error: any) {
      if (error.message === "Incorrect current password") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      next(error);
    }
  };
}