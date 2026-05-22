import { z } from "zod";

// Filter validation
export const issueFilterSchema = z.object({
  query: z.object({
    sort: z
      .enum(["newest", "oldest"], {
        error: "Sort must be either 'newest' or 'oldest'",
      })
      .optional(),

    type: z
      .enum(["bug", "feature_request"], {
        error: "Type must be 'bug' or 'feature_request'",
      })
      .optional(),

    status: z
      .enum(["open", "in_progress", "resolved"], {
        error: "Status must be 'open', 'in_progress', or 'resolved'",
      })
      .optional(),
  }),
});

// Create Issue validation
export const createIssueSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title is too short")
      .max(150, "Title should be under 150 characters"),
    description: z.string().min(20, "Description must be at least 20 chars"),
    type: z.enum(["bug", "feature_request"], {
      error: "Type must be 'bug' or 'feature_request'",
    }),
    status: z.enum(["open", "in_progress", "resolved"]).optional(),
  }),
});

// Update Issue validation
export const updateIssueSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title is too short")
      .max(150, "Title should be under 150 characters")
      .optional(),
    description: z
      .string()
      .min(20, "Description must be at least 20 chars")
      .optional(),
    type: z
      .enum(["bug", "feature_request"], {
        error: "Type must be 'bug' or 'feature_request'",
      })
      .optional(),
    status: z.enum(["open", "in_progress", "resolved"]).optional(),
  }),
});
