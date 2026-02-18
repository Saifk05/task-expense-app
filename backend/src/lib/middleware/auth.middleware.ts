import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, TokenPayload } from "../authentication/jwt.util";
import { AppError } from "../errors/app-error";
import { ErrorCode } from "../errors/error-codes";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError(
        "Authentication token missing",
        401,
        ErrorCode.UNAUTHORIZED
      )
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch {
    return next(
      new AppError(
        "Invalid or expired token",
        401,
        ErrorCode.UNAUTHORIZED
      )
    );
  }
};

export default authMiddleware;
