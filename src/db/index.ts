import { Pool } from "pg";
import config from "../config";
import { createUsersTable } from "./schema/users.schema";
import { createIssuesTable } from "./schema/issues.schema";

export const pool = new Pool({
  connectionString: config.database_url,
});

export const initDB = async () => {
  try {
    //users table
    await pool.query(createUsersTable);
    console.log("User table Created");
    //Issues table
    await pool.query(createIssuesTable);
    console.log("Issues table Created");
  } catch (error) {
    console.log("DB INIT ERROR:", error);
    process.exit(1);
  }
};
