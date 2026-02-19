import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors/app-error";
import { ErrorCode } from "../errors/error-codes";

const validate =
  (schema: ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;

      return next(
        new AppError(
          "Validation failed",
          400,
          ErrorCode.VALIDATION_ERROR,
          formattedErrors
        )
      );
    }

    req.body = result.data;
    next();
  };

export default validate;
