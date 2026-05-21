import type { TRequest, TResponse } from "../../../types/express.types";
import { AppError } from "../../../utils/appError";
import { asyncHandler } from "../../../utils/asyncHandler";
import { signToken } from "../../../utils/jwt";
import { sendResponse } from "../../../utils/sendResponse";
import authService from "./auth.service";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */

const signUp = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }
  // Create user through service layer which handles hashing and duplication checks
  const payload = { name, email, password, role };
  const user = await authService.signUpUser(payload);
  if (!user) throw new AppError("Failed to create user", 400);

  sendResponse({
    res,
    status: 201,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

/**
 * @desc    Authenticate user & get user profile
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }
  // Validate credentials via service layer
  const user = await authService.validateUser(email, password);
  if (!user) throw new AppError("Invalid email or password", 401);

  // Generate pair of Access & Refresh tokens for the authenticated user
  const { accessToken, refreshToken } = signToken(user);

  const result = {
    user: user,
    accessToken,
    refreshToken,
  };

  sendResponse({
    res,
    status: 200,
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});

export const authControllers = {
  signUp,
  login,
};
