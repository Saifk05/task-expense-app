import { Response, NextFunction } from "express";
import { AuthRequest } from "../../lib/middleware/auth.middleware";
import { getTaskDashboard } from "./task-dashboard.service";
import { ProductivityQueryType } from "./task-dashboard.schema";

export const getTaskDashboardController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const userId = req.user.userId;
    const query = req.query as unknown as ProductivityQueryType;

    const data = await getTaskDashboard(userId, query);

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};