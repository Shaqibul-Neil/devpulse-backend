import express from "express";
import { authenticate } from "../../../middlewares/authenticate";
import { authorize } from "../../../middlewares/authorize";
import { issuesController } from "./issues.controller";
import { validateRequest } from "../../../middlewares/validate";
import {
  createIssueSchema,
  issueFilterSchema,
  updateIssueSchema,
} from "./issues.validation";

const router = express.Router();

router.get(
  "/",
  validateRequest(issueFilterSchema),
  issuesController.getAllIssues,
);

router.get("/:id", issuesController.getSingleIssues);

router.post(
  "/",
  authenticate,
  validateRequest(createIssueSchema),
  issuesController.createIssue,
);

router.patch(
  "/:id",
  authenticate,
  validateRequest(updateIssueSchema),
  issuesController.updateIssue,
);

router.delete(
  "/:id",
  authenticate,
  authorize("maintainer"),
  issuesController.deleteIssue,
);

export const issuesRoutes = router;
