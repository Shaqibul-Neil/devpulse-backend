import type { TIssueStatus, TIssueTypes, TRoles } from "../../../types/types";

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

export interface IIssueFilters {
  sort?: string;
  type?: TIssueTypes;
  status?: TIssueStatus;
}

export interface IReporter {
  id: number;
  name: string;
  role: TRoles;
}

export interface IAllIssueResponse {
  id: number;
  title: string;
  description: string;
  type: TIssueTypes;
  status?: TIssueStatus;
  reporter: IReporter;
  created_at: Date;
  updated_at: Date;
}
