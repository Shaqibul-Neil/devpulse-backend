import type { TRoles } from "../../../types/types";
import { AppError } from "../../../utils/appError";
import { usersModels } from "../users/users.model";
import type {
  IIssue,
  IIssueFilters,
  IIssueResponse,
  IAllIssueResponse,
  IReporter,
} from "./issues.interface";
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
   * Get all Issue.
   * Returns issues with issuer information.
   */
  async getIssues(filters: IIssueFilters): Promise<IAllIssueResponse[]> {
    const issues = await issueModels.getAllIssueFromDB(filters);
    if (issues.length === 0) return [];

    const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

    const reporters = await usersModels.getReportersByIdsFromDB(reporterIds);

    const reporterMap = new Map(reporters.map((r) => [r.id, r]));

    return issues.map((issue) => {
      const { reporter_id, ...issueData } = issue;
      const reporter = reporterMap.get(reporter_id) as IReporter;
      return {
        ...issueData,
        reporter: reporter,
      };
    });
  }

  /**
   * Get a single Issue.
   * Returns issue with issuer information.
   */

  async getSingleIssue(issue_id: number): Promise<IAllIssueResponse> {
    const issue = await issueModels.getIssueByIdFromDB(issue_id);
    if (!issue) throw new AppError("Issue not found", 404);

    const { reporter_id, ...issueData } = issue;

    const reporterInfo = (await usersModels.getUserByIdFromDB(
      reporter_id,
    )) as IReporter;

    if (!reporterInfo) throw new AppError("Reporter info not found", 404);

    const result: IAllIssueResponse = {
      ...issueData,
      reporter: {
        id: reporterInfo?.id,
        name: reporterInfo?.name,
        role: reporterInfo?.role,
      },
    };
    return result;
  }

  /**
   * Updates a Issue based on RBAC and status constraints.
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

    const isMaintainer = role === "maintainer";
    const isOwner = existingIssue.reporter_id === user_id;

    // Only owners or maintainers can update
    if (!isMaintainer && !isOwner) {
      throw new AppError(
        "Forbidden: You don't have permission to update this issue",
        403,
      );
    }
    // contributors can only update if status is 'open'
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
