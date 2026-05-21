import express from "express";
import { authControllers } from "./auth.controller";
import { authenticate } from "../../../middlewares/authenticate";
import { authorize } from "../../../middlewares/authorize";

const router = express.Router();

router.post("/signup", authControllers.signUp);
router.post("/login", authControllers.login);
router.get("/refresh-token", authControllers.refresh);

router.get("/test", authenticate, authorize("maintainer"), (req, res) => {
  res.send("secret");
});
export const authRoutes = router;
