import type { TRequest, TResponse } from "../../../types/express.types";
import { AppError } from "../../../utils/appError";
import { asyncHandler } from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import usersService from "./users.service";

/**
 * desc    Fetch all user profiles
 * route   GET /api/users
 * access  Protected(Maintainer)
 */
const getAllUser = asyncHandler(async (req: TRequest, res: TResponse) => {
  const result = await usersService.getAllUsers();
  sendResponse({
    res,
    status: 200,
    success: true,
    message: "Users data fetched successfully",
    data: result,
  });
});

/**
 * desc    Fetch a single user profile by email
 * route   GET /api/users/:email
 * access  Protected (Authenticated User)
 */
const getSingleUserById = asyncHandler(
  async (req: TRequest, res: TResponse) => {
    const { id } = req.params;
    const targetId = Number(id);
    const isOwner = targetId === req.user.id;
    const isMaintainer = req.user.role === "maintainer";
    if (!isOwner && !isMaintainer) {
      throw new AppError(
        "Forbidden",
        403,
        "You do not have permission to access this resource.",
      );
    }

    const result = await usersService.getUserById(targetId);
    if (!result) {
      throw new AppError(
        "User not found",
        404,
        "The requested user record does not exist.",
      );
    }

    sendResponse({
      res,
      status: 200,
      success: true,
      message: "User data fetched successfully",
      data: result,
    });
  },
);

export const usersControllers = {
  getAllUser,
  getSingleUserById,
};
