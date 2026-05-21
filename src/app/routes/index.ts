import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { issuesRoutes } from "../modules/issues/issues.route";
import { usersRoutes } from "../modules/users/users.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/issues",
    route: issuesRoutes,
  },
  {
    path: "/users",
    route: usersRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
