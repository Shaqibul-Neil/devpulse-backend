import express from "express";
import { authControllers } from "./auth.controller";
import { validateRequest } from "../../../middlewares/validate";
import {
  loginValidationSchema,
  signupValidationSchema,
} from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(signupValidationSchema),
  authControllers.signUp,
);
router.post(
  "/login",
  validateRequest(loginValidationSchema),
  authControllers.login,
);
router.get("/refresh-token", authControllers.refresh);

export const authRoutes = router;
