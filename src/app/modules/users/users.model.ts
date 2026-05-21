import { pool } from "../../../db";
import type { ISafeUser, IUsers } from "./users.interface";

/**
 * Retrieves all users.
 * Note: Explicitly selects fields to exclude the password hash from the result set.
 */
const getAllUsersFromDB = async (): Promise<ISafeUser[]> => {
  const query = `SELECT id, name, email, role, created_at, updated_at FROM users`;

  const res = await pool.query(query);
  return res.rows;
};

/**
 * Fetches a user record by email.
 * Returns IUsers (including password) for authentication purposes.
 */
const getUserByEmailFromDB = async (
  email: string,
): Promise<IUsers | undefined> => {
  const query = `
    SELECT * FROM users WHERE email = $1
    `;
  const values = [email];
  const res = await pool.query(query, values);
  return res.rows[0];
};

/**
 * Fetches a user record by id.
 * without the password column – used for refresh, profile, etc
 */
const getUserByIdFromDB = async (
  id: number,
): Promise<ISafeUser | undefined> => {
  const query = `
    SELECT id, name, email, role FROM users WHERE id = $1
    `;
  const values = [id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const usersModels = {
  getAllUsersFromDB,
  getUserByEmailFromDB,
  getUserByIdFromDB,
};
