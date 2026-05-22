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
      throw new AppError(
        "Authentication required",
        401,
        "Authorization header is missing or does not follow the 'Bearer <token>' schema.",
      );
    }
    const token = authHeader.split(" ")[1];
    if (!token)
      throw new AppError(
        "Token not found",
        401,
        "The authentication attempt failed because the Bearer token payload is empty.",
      );

    const user = await authService.verifyAndGetUser(token, "access");
    req.user = user;

    next();
  } catch (err) {
    // If token verification fails, treat as unauthorized
    next(
      new AppError(
        "verification failed",
        401,
        "Invalid or expired authentication token",
      ),
    );
  }
};
