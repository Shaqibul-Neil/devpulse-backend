import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { TApplication, TRequest, TResponse } from "./types/express.types";
import router from "./app/routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import config from "./config";

const app: TApplication = express();

/**
 * Middleware Pipeline
 */
app.use(express.json());
app.use(
  cors({
    origin: config.url,
    credentials: true,
  }),
);
app.use(cookieParser());

/**
 * Application Routes
 * Prefixing all API routes with /api
 */
app.use("/api", router);
app.get("/", (req: TRequest, res: TResponse) => {
  res.send("Welcome to DevPulse Server");
});

/**
 * Global Error Handler
 *
 */
app.use(globalErrorHandler);

export default app;
