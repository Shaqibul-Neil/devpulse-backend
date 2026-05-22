import express from "express";
import { usersControllers } from "./users.controller";
import { authenticate } from "../../../middlewares/authenticate";
import { authorize } from "../../../middlewares/authorize";

const router = express.Router();
/**
 * @route  /api/users
 */
router.get(
  "/",
  authenticate,
  authorize("maintainer"),
  usersControllers.getAllUser,
);
router.get("/:id", authenticate, usersControllers.getSingleUserById);

export const usersRoutes = router;
