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
import { issueFilter } from "../../../utils/filters";

/**
 * desc    Create a new issue
 * access  Authenticated Users
 */
const createIssue = asyncHandler(
  async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const { title, description, type, status } = req.body;
    const { id } = req.user;

    // Create issue through service layer
    const payload = { title, description, type, status, reporter_id: id };
    const issue = await issuesService.createIssue(payload);
    if (!issue)
      throw new AppError(
        "Failed to create issue",
        500,
        `The issue could not be persisted in the database.`,
      );

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
 * desc    Get all issue
 * access  Public
 */
const getAllIssues = asyncHandler(
  async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const filters = issueFilter(req.query);
    const issues = await issuesService.getIssues(filters);

    sendResponse({
      res,
      status: 200,
      success: true,
      message: "Issues retrieved successfully",
      data: issues,
    });
  },
);

/**
 * desc    Get a single issue
 * access  Public
 */
const getSingleIssues = asyncHandler(
  async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      throw new AppError(
        "Bad Request",
        400,
        "The provided issue ID must be a valid number.",
      );
    }
    const issue = await issuesService.getSingleIssue(Number(id));

    sendResponse({
      res,
      status: 200,
      success: true,
      message: "Issues retrieved successfully",
      data: issue,
    });
  },
);

/**
 * desc    Update a new issue
 * access  Authenticated Users
 */
const updateIssue = asyncHandler(
  async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const { id: issue_id } = req.params;
    const { role, id: user_id } = req.user;
    const { title, description, status } = req.body;

    if (isNaN(Number(issue_id))) {
      throw new AppError(
        "Bad Request",
        400,
        "The provided issue ID must be a valid number.",
      );
    }

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
 * access  Maintainer
 */
const deleteIssue = asyncHandler(
  async (req: TRequest, res: TResponse, next: TNextFunction) => {
    const { id } = req.params;
    const targetId = Number(id);

    if (isNaN(targetId)) {
      throw new AppError(
        "Bad Request",
        400,
        "The provided issue ID must be a valid number.",
      );
    }
    await issuesService.deleteIssue(targetId);
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
  getAllIssues,
  getSingleIssues,
};
