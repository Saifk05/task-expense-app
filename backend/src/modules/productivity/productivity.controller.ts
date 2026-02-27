import { Request, Response } from "express";
import { ProductivityService } from "./productivity.service";
import { productivityQuerySchema } from "./productivity.validation";

// interface AuthRequest extends Request {
//   user?: {
//     userId: string;
//   };
// }

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export class ProductivityController {
  private service: ProductivityService;

  constructor() {
    this.service = new ProductivityService();
  }

  getProductivitySummary = async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const validation = productivityQuerySchema.safeParse(req.query);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid query parameters",
          errors: validation.error.flatten()
        });
      }

      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized"
        });
      }

      const data = await this.service.getProductivitySummary(userId);

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error) {
      console.error("Productivity Summary Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch productivity summary"
      });
    }
  };


private handleTaskType = async (
  req: AuthRequest,
  res: Response,
  type: string
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const cursor =
      typeof req.query.cursor === "string"
        ? req.query.cursor
        : undefined;

    const limit =
      typeof req.query.limit === "string"
        ? parseInt(req.query.limit)
        : 10;

    const data = await this.service.getTasksByType(
      userId,
      type,
      cursor,
      limit
    );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
};

getPendingTasks = async (req: AuthRequest, res: Response) => {
  return this.handleTaskType(req, res, "PENDING");
};

getOverdueTasks = async (req: AuthRequest, res: Response) => {
  return this.handleTaskType(req, res, "OVERDUE");
};

getCompletedTasks = async (req: AuthRequest, res: Response) => {
  return this.handleTaskType(req, res, "COMPLETED");
};

getCancelledTasks = async (req: AuthRequest, res: Response) => {
  return this.handleTaskType(req, res, "CANCELLED");
};

getInProgressTasks = async (req: AuthRequest, res: Response) => {
  return this.handleTaskType(req, res, "IN_PROGRESS");
};
}