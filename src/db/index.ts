import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.database_url,
});

export const initDB = async () => {
  try {
    //users table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,

        name VARCHAR(100) NOT NULL,

        email VARCHAR(100) NOT NULL UNIQUE,

        password TEXT NOT NULL,

        role VARCHAR(100) NOT NULL DEFAULT 'contributor'
        CHECK (role IN ('contributor', 'maintainer')),

        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        `);
    console.log("User table Created");
    //Issues table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,

        title VARCHAR(150) NOT NULL,

        description TEXT NOT NULL
        CHECK(char_length(description) >= 20),

        type VARCHAR(20) NOT NULL
        CHECK(type IN('bug', 'feature_request')),

        status VARCHAR(100) DEFAULT 'open'
        CHECK(status IN('open', 'in_progress', 'resolved')),

        reporter_id INT NOT NULL,

        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        `);
    console.log("Issues table Created");
  } catch (error) {
    console.log("DB INIT ERROR:", error);
    process.exit(1);
  }
};
