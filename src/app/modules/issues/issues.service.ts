import type { TRoles } from "../../../types/types";
import { AppError } from "../../../utils/appError";
import type { IIssue, IIssueResponse } from "./issues.interface";
import { issueModels } from "./issues.model";

class IssueService {
  /**
   * Creates a Issue.
   * Returns issue with issuer information.
   */
  async createIssue(issue: IIssue): Promise<IIssueResponse> {
    // Ensuring default status if not provided
    const payload = { ...issue, status: issue.status || "open" };
    const result = await issueModels.createIssueInDB(payload);
    return result;
  }

  /**
   * Updates a Issue.
   * Returns issue with issuer information.
   */
  async updateIssue(
    issue_id: number,
    role: TRoles,
    user_id: number,
    data: Partial<IIssue>,
  ): Promise<IIssueResponse> {
    const existingIssue = await issueModels.getIssueByIdFromDB(issue_id);
    if (!existingIssue) throw new AppError("Issue not found", 404);

    //Authorization logic
    const isMaintainer = role === "maintainer";
    const isOwner = existingIssue.reporter_id === user_id;

    if (!isMaintainer && !isOwner) {
      throw new AppError(
        "Forbidden: You don't have permission to update this issue",
        403,
      );
    }

    if (!isMaintainer && existingIssue.status !== "open") {
      throw new AppError("You can only update an open issue", 409);
    }

    const result = await issueModels.updateIssueInDB(issue_id, data);
    return result;
  }

  /**
   * Deletes a Issue.
   */
  async deleteIssue(id: number): Promise<void> {
    const isDeleted = await issueModels.deleteIssueFromDB(id);
    // Check if the issue existed before deletion
    if (!isDeleted) {
      throw new AppError("Issue not found or already deleted", 404);
    }
  }
}

export default new IssueService();
