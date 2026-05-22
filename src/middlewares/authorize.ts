import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../types/express.types";
import type { TRoles } from "../types/types";
import { AppError } from "../utils/appError";

export const authorize = (...roles: TRoles[]) => {
  return (req: TRequest, res: TResponse, next: TNextFunction) => {
    if (!req.user)
      throw new AppError(
        "Unauthorized",
        401,
        "Missing or invalid authentication context. Please re-authenticate",
      );

    if (!roles.includes(req.user.role))
      throw new AppError(
        "Forbidden Access",
        403,
        `Access denied. Role '${req.user.role}' lacks necessary privileges.`,
      );

    return next();
  };
};
