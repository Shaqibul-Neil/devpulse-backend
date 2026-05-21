import type { TIssueStatus, TIssueTypes } from "../../../types/types";

export interface IIssue {
  title: string;
  description: string;
  type: TIssueTypes;
  status?: TIssueStatus;
  reporter_id: number;
}

export interface IIssueResponse extends IIssue {
  id: number;
  created_at: Date;
  updated_at: Date;
}
