import { title } from "node:process";
import type {
  TNextFunction,
  TRequest,
  TResponse,
} from "../../../types/express.types";
import { AppError } from "../../../utils/appError";
import { asyncHandler } from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import type { IIssue } from "./issues.interface";
import issuesService from "./issues.service";

/**
 * desc    Create a new issue
 * route   POST /api/issues
 * access  Authenticated Users
 */
const createIssue = asyncHandler(
  async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const { title, description, type, status } = req.body;
    const { id } = req.user;

    if (!title || !description || !type) {
      throw new AppError("All fields are required", 400);
    }

    // Create issue through service layer
    const payload = { title, description, type, status, reporter_id: id };
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

/**
 * desc    Update a new issue
 * route   Patch /api/issues/:id
 * access  Authenticated Users
 */
const updateIssue = asyncHandler(
  async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const { id: issue_id } = req.params;
    const { role, id: user_id } = req.user;
    const { title, description, status } = req.body;

    //Partial Update
    const data: Partial<IIssue> = {};
    if (title) data.title = title;
    if (description) data.description = description;
    if (status) data.status = status;

    const updated = await issuesService.updateIssue(
      Number(issue_id),
      role,
      user_id,
      data,
    );

    sendResponse({
      res,
      status: 200,
      success: true,
      message: "Issue updated successfully",
      data: updated,
    });
  },
);

/**
 * desc    Delete a issue
 * route   POST /api/issues/:id
 * access  Maintainer
 */
const deleteIssue = asyncHandler(
  async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const { id } = req.params;
    await issuesService.deleteIssue(Number(id));
    sendResponse({
      res,
      status: 200,
      success: true,
      message: "Issue deleted successfully",
    });
  },
);

export const issuesController = {
  createIssue,
  updateIssue,
  deleteIssue,
};
