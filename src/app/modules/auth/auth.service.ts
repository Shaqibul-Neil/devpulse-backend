import bcrypt from "bcrypt";
import type { ISafeUser, ISignUpUser } from "../users/users.interface";
import { authModels } from "./auth.model";
import config from "../../../config";
import usersService from "../users/users.service";
import { AppError } from "../../../utils/appError";
import { verifyToken } from "../../../utils/jwt";

class AuthService {
  /**
   * Registers a new user.
   * Handles business logic: duplicate check, password hashing, and persistence.
   */
  async signUpUser(user: ISignUpUser): Promise<ISafeUser> {
    const { name, email, password, role = "contributor" } = user;

    const isUserExist = await usersService.getSingleUser(email);
    if (isUserExist) {
      throw new AppError(
        "Duplicate Email",
        400,
        "The email address is already registered in our system. Please log in.",
      );
    }

    // Using bcrypt to hash password with pre-configured salt rounds
    const hashPassword = await bcrypt.hash(password, config.bcrypt_salt_rounds);

    const payload: ISignUpUser = { name, email, password: hashPassword, role };
    const result = await authModels.signUpUserInDB(payload);

    return result;
  }

  /**
   * Validates user credentials.
   * Returns a sanitized user object if valid, otherwise null.
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<ISafeUser | null> {
    const user = await usersService.getSingleUser(email);
    if (!user) return null;

    // Direct comparison of plaintext password against the stored hash
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    // Exclude password from the returned object for security
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Centralized token verification and user retrieval.
   * Handles both 'access' and 'refresh' token types.
   */
  async verifyAndGetUser(token: string, type: "access" | "refresh") {
    const payload = verifyToken(token, type);
    if (!payload)
      throw new AppError(
        "Invalid token",
        401,
        "The provided token is invalid or expired. Please log in again to obtain a new token.",
      );

    const user = await usersService.getUserById(payload.id);
    if (!user)
      throw new AppError(
        "User not found",
        404,
        "The requested user record does not exist in the system.",
      );

    return user;
  }
}

export default new AuthService();
