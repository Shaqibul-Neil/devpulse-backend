import type { TRoles } from "../../../types/types";

export interface IBaseUser {
  name: string;
  email: string;
  password: string;
}
// Full DB User Shape
export interface IUsers extends IBaseUser {
  id: number;
  role: TRoles;
  created_at: Date;
  updated_at: Date;
}

// Signup Request Body
export interface ISignUpUser extends IBaseUser {
  role?: TRoles;
}

// Safe User Response
export type ISafeUser = Omit<IUsers, "password">;
