import { pool } from "../../../db";
import type { IIssue, IIssueFilters, IIssueResponse } from "./issues.interface";

/**
 * Persists a new issue record into the database
 * Returns The newly created issue record from the database
 */
const createIssueInDB = async (issue: IIssue): Promise<IIssueResponse> => {
  const { title, description, type, status, reporter_id } = issue;
  const sql = `
    INSERT INTO issues 
    (title, description, type, status, reporter_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [title, description, type, status, reporter_id];
  const res = await pool.query(sql, values);

  return res.rows[0];
};

/**
 
 */
const getAllIssueFromDB = async (
  filters: IIssueFilters,
): Promise<IIssueResponse[]> => {
  const { sort, type, status } = filters;
  const conditions: string[] = [];
  const values: string[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }
  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const orderBy = sort === "oldest" ? `created_at ASC` : "created_at DESC";

  const sql = `
  SELECT * FROM issues ${whereClause} ORDER BY ${orderBy}
  `;

  const result = await pool.query(sql, values);
  return result.rows;
};

/**
 * Performs a dynamic partial update on an issue record
 */
const updateIssueInDB = async (id: number, data: Partial<IIssue>) => {
  const fields = Object.keys(data)
    .map((key, idx) => `${key} = $${idx + 2}`)
    .join(", ");
  const values = Object.values(data);

  const sql = `
  UPDATE issues
  SET ${fields}, updated_at = NOW()
  WHERE id = $1
  RETURNING *
  `;
  const res = await pool.query(sql, [id, ...values]);
  return res.rows[0];
};

/**
 * desc  Fetches a single issue by ID
 */

const getIssueByIdFromDB = async (
  id: number,
): Promise<IIssueResponse | null> => {
  const sql = `
  SELECT * FROM issues WHERE id = $1
  `;

  const res = await pool.query(sql, [id]);
  return res.rows[0] || null;
};

/**
 * desc    Removes an issue record from the database
 */
const deleteIssueFromDB = async (id: number) => {
  const sql = `
  DELETE FROM issues
  WHERE id=$1
  `;
  const values = [id];
  const res = await pool.query(sql, values);

  return (res.rowCount ?? 0) > 0;
};

export const issueModels = {
  createIssueInDB,
  deleteIssueFromDB,
  updateIssueInDB,
  getIssueByIdFromDB,
  getAllIssueFromDB,
};
