import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, TokenPayload } from "../authentication/jwt.util";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // No token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    return next();
  } catch (err: any) {
    // Explicit 401 for expired or invalid token
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;