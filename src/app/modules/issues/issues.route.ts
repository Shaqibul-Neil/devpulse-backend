import express from "express";
import { authenticate } from "../../../middlewares/authenticate";
import { authorize } from "../../../middlewares/authorize";
import { issuesController } from "./issues.controller";

const router = express.Router();

router.post("/", authenticate, issuesController.createIssue);

router.patch("/:id", authenticate, issuesController.updateIssue);

router.delete(
  "/:id",
  authenticate,
  authorize("maintainer"),
  issuesController.deleteIssue,
);

export const issuesRoutes = router;
