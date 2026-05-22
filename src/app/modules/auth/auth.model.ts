import { pool } from "../../../db";
import type { ISafeUser, ISignUpUser } from "../users/users.interface";

/**
 * Persists a new user record to the database.
 * Uses RETURNING clause to avoid an extra SELECT query after insertion.
 */
const signUpUserInDB = async (user: ISignUpUser): Promise<ISafeUser> => {
  const { name, email, password, role } = user;
  const query = `
    INSERT INTO users 
    (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at, updated_at
  `;

  const values = [name, email, password, role];
  const res = await pool.query(query, values);

  return res.rows[0];
};

export const authModels = {
  signUpUserInDB,
};
