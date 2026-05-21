import { pool } from "../../../db";
import type { ISafeUser } from "./users.interface";

//Get All User From DB
const getAllUsersFromDB = async (): Promise<ISafeUser[]> => {
  const query = `SELECT id, name, email, role, created_at, updated_at FROM users`;

  const res = await pool.query(query);
  return res.rows;
};

//Get A single user based on email
const getUserByEmailFromDB = async (
  email: string,
): Promise<ISafeUser | undefined> => {
  const query = `
    SELECT id, name, email, role, created_at, updated_at FROM users WHERE email = $1
    `;
  const values = [email];
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const usersModels = {
  getAllUsersFromDB,
  getUserByEmailFromDB,
};
