import type { TRequest, TResponse } from "../../../types/express.types";
import { AppError } from "../../../utils/appError";
import { asyncHandler } from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import usersService from "../users/users.service";
import authService from "./auth.service";

// Signup
const signUp = asyncHandler(async (req: TRequest, res: TResponse) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  //Check if user already exist in db
  const isUserExist = await usersService.getSingleUser(email);
  if (isUserExist) {
    throw new AppError("Email already in use", 409);
  }

  const payload = { name, email, password, role };

  const user = await authService.signUpUser(payload);
  sendResponse({
    res,
    status: 201,
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const authControllers = {
  signUp,
};
