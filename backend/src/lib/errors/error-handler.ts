import { Request, Response, NextFunction } from "express";
import { AppError } from "./app-error";
import { ErrorCode } from "./error-codes";
import { env } from "../../config/environments";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      details: err.details,
    });
  }

  // Unexpected errors
  return res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
    code: ErrorCode.INTERNAL_SERVER_ERROR,
  });
};

export default errorHandler;
