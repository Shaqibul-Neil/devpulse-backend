import { pool } from "../../../db";
import type { IIssue, IIssueResponse } from "./issues.interface";

/**
 * Persists a new issue record into the database
 * rReturns The newly created issue record from the database
 */
const createIssueInDB = async (issue: IIssue): Promise<IIssueResponse> => {
  const { title, description, type, status, reporter_id } = issue;
  const query = `
    INSERT INTO issues 
    (title, description, type, status, reporter_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [title, description, type, status, reporter_id];
  const res = await pool.query(query, values);

  return res.rows[0];
};

const updateIssueInDB = async (id: number, data: Partial<IIssue>) => {
  const fields = Object.keys(data)
    .map((key, idx) => `${key} = $${idx + 2}`)
    .join(", ");
  const values = Object.values(data);

  const query = `
  UPDATE issues
  SET ${fields}, updated_at = NOW()
  WHERE id = $1
  RETURNING *
  `;
  const res = await pool.query(query, [id, ...values]);
  return res.rows[0];
};

const getIssueByIdFromDB = async (
  id: number,
): Promise<IIssueResponse | null> => {
  const query = `
  SELECT * FROM issues WHERE id = $1
  `;

  const res = await pool.query(query, [id]);
  return res.rows[0] || null;
};

const deleteIssueFromDB = async (id: number) => {
  const query = `
  DELETE FROM issues
  WHERE id=$1
  `;
  const values = [id];
  const res = await pool.query(query, values);
  console.log("--------delete", res);
  return (res.rowCount ?? 0) > 0;
};

export const issueModels = {
  createIssueInDB,
  deleteIssueFromDB,
  updateIssueInDB,
  getIssueByIdFromDB,
};
