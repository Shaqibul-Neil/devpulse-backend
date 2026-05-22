import express from "express";
import { authenticate } from "../../../middlewares/authenticate";
import { authorize } from "../../../middlewares/authorize";
import { issuesController } from "./issues.controller";

const router = express.Router();

router.get("/", issuesController.getAllIssues);

router.get("/:id", issuesController.getSingleIssues);

router.post("/", authenticate, issuesController.createIssue);

router.patch("/:id", authenticate, issuesController.updateIssue);

router.delete(
  "/:id",
  authenticate,
  authorize("maintainer"),
  issuesController.deleteIssue,
);

export const issuesRoutes = router;
