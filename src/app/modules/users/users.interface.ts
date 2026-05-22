import type { TRoles } from "../../../types/types";

/* ========== Base User ========== */
export interface IBaseUser {
  name: string;
  email: string;
}

/* ========== Signup Request (Frontend input) ========== */
export interface ISignUpUser extends IBaseUser {
  password: string;
  role?: TRoles;
}

/* ========== DB User (stored in DB) ========== */
export interface IUsers extends IBaseUser {
  id: number;
  password: string;
  role: TRoles;
  created_at: Date;
  updated_at: Date;
}

/* ========== Safe Response ========== */
export type ISafeUser = Omit<IUsers, "password">;
export type TReporter = Pick<ISafeUser, "id" | "name" | "role">;

/* ========== JWT payload ========== */ export interface IJwtPayload extends IBaseUser {
  id: number;
  role: TRoles;
}
