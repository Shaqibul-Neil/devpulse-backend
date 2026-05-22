import type { TRequest, TResponse } from "../../../types/express.types";
import { AppError } from "../../../utils/appError";
import { asyncHandler } from "../../../utils/asyncHandler";
import { setRefreshTokenCookie } from "../../../utils/cookie";
import { signToken } from "../../../utils/jwt";
import { sendResponse } from "../../../utils/sendResponse";
import authService from "./auth.service";

/**
 * desc    Register a new user
 * route   POST /api/auth/signup
 * access  Public
 */
const signUp = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { name, email, password, role } = req.body;

  // Create user through service layer which handles hashing and duplication checks
  const payload = { name, email, password, role };
  const user = await authService.signUpUser(payload);
  if (!user)
    throw new AppError(
      "Registration failed",
      400,
      "Unable to create account at this moment. Please try again later.",
    );

  sendResponse({
    res,
    status: 201,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

/**
 * desc    Authenticate user & get user profile
 * route   POST /api/auth/login
 * access  Public
 */
const login = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { email, password } = req.body;

  // Validate credentials via service layer
  const user = await authService.validateUser(email, password);
  if (!user)
    throw new AppError(
      "Authentication failed",
      401,
      "The email or password you entered is incorrect. Please check your credentials.",
    );

  // Generate Access & Refresh tokens
  const { accessToken, refreshToken } = signToken(user);
  const result = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token: { accessToken, refreshToken },
  };

  setRefreshTokenCookie(res, refreshToken);
  sendResponse({
    res,
    status: 200,
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});

/**
 * desc    Refresh the access token using the HttpOnly refresh cookie
 * route   POST /api/auth/refresh
 * access  Public (via cookie)
 */
const refresh = asyncHandler(async (req: TRequest, res: TResponse) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken)
    throw new AppError(
      "Unauthorized",
      401,
      "Refresh token is missing from your request cookies.",
    );

  // Validate token and get user via service layer
  const user = await authService.verifyAndGetUser(refreshToken, "refresh");

  // Token Rotation : Invalidate previous refresh token by issuing a new one
  const { accessToken, refreshToken: newRefreshToken } = signToken(user);
  setRefreshTokenCookie(res, newRefreshToken);

  sendResponse({
    res,
    status: 200,
    success: true,
    message: "Access token generated",
    data: { token: { accessToken, newRefreshToken } },
  });
});

export const authControllers = {
  signUp,
  login,
  refresh,
};
