import authService from "../app/modules/auth/auth.service";
import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../types/express.types";
import { AppError } from "../utils/appError";

export const authenticate = async (
  req: TRequest,
  res: TResponse,
  next: TNextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Missing or malformed Authorization header", 401);
    }
    const token = authHeader.split(" ")[1];
    if (!token) throw new AppError("Token not found", 401);

    const user = await authService.verifyAndGetUser(token, "access");
    req.user = user;

    next();
  } catch (err) {
    // If token verification fails, treat as unauthorized
    next(new AppError((err as Error).message, 401));
  }
};
