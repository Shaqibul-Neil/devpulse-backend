import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../types/express.types";
import type { TRoles } from "../types/types";
import { AppError } from "../utils/appError";

export const authorize = (...roles: TRoles[]) => {
  return (req: TRequest, res: TResponse, next: TNextFunction) => {
    if (!req.user) throw new AppError("Unauthorized", 401);

    if (!roles.includes(req.user.role))
      throw new AppError("Forbidden Access", 403);

    return next();
  };
};
