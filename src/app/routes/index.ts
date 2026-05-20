import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { issuesRoutes } from "../modules/issues/issues.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/",
    route: issuesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
