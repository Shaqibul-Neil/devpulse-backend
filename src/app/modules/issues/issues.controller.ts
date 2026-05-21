import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../../../types/express.types";
import { AppError } from "../../../utils/appError";
import { asyncHandler } from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import issuesService from "./issues.service";

/**
 * desc    Create a new issue
 * route   POST /api/issues
 * access  Authenticated Users
 */
const createIssue = asyncHandler(
  async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const { title, description, type, status = "open" } = req.body;
    const { id } = req.user;

    if (!title || !description || !type) {
      throw new AppError("All fields are required", 400);
    }

    // Create user through service layer which handles hashing and duplication checks
    const payload = { title, description, type, status, reporter_id: id };
    console.log(payload);
    const issue = await issuesService.createIssue(payload);
    if (!issue) throw new AppError("Failed to create issue", 400);

    sendResponse({
      res,
      status: 201,
      success: true,
      message: "Issue created successfully",
      data: issue,
    });
  },
);

export const issuesController = {
  createIssue,
};
