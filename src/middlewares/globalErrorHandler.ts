import type {
  TRequest,
  TResponse,
  TNextFunction,
} from "../types/express.types";
import { AppError } from "../utils/appError";

export const globalErrorHandler = (
  err: unknown,
  req: TRequest,
  res: TResponse,
  next: TNextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err instanceof Error ? err.message : err,
  });
};
