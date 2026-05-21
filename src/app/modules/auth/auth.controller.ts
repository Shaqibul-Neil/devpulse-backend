import type { TRequest, TResponse } from "../../../types/express.types";
import { asyncHandler } from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import authService from "./auth.service";

// Signup
const signUp = asyncHandler(async (req: TRequest, res: TResponse) => {
  const user = await authService.signUpUser(req.body);
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
