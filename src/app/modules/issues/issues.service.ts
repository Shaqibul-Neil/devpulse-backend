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
