import express from "express";
import { usersControllers } from "./users.controller";

const router = express.Router();

router.get("/", usersControllers.getAllUser);
router.get("/:email", usersControllers.getSingleUserByEmail);

export const usersRoutes = router;
