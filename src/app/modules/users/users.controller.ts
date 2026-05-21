import type { TRequest, TResponse } from "../../../types/express.types";
import { asyncHandler } from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import usersService from "./users.service";

//===========================
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

//===========================
const getSingleUserByEmail = asyncHandler(
  async (req: TRequest, res: TResponse) => {
    const { email } = req.params;
    const result = await usersService.getSingleUser(email as string);
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
  getSingleUserByEmail,
};
