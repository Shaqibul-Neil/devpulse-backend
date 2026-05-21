export const USER_ROLES = ["contributor", "maintainer"] as const;

export type TRoles = (typeof USER_ROLES)[number];

export type TIssueTypes = "bug" | "feature_request";
export type TIssueStatus = "open" | "in_progress" | " resolved";
