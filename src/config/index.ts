import dotenv from "dotenv";
import path from "path";
import { env } from "process";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: env.PORT as string,
  database_url: env.DATABASE_URL as string,
  access_token_secret: env.JWT_ACCESS_TOKEN_SECRET,
  refresh_token_secret: env.JWT_REFRESH_TOKEN_SECRET,
};

export default config;
