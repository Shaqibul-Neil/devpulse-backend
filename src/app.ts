import express from "express";
import cors from "cors";
import type {
  TApplication,
  TRequest,
  TResponse,
} from "./shared/types/express.types";
import router from "./app/routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app: TApplication = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api", router);
app.get("/", (req: TRequest, res: TResponse) => {
  res.send("Welcome to DevPulse Server");
});

//Global Error handler
app.use(globalErrorHandler);

export default app;
