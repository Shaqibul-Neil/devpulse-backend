import bcrypt from "bcrypt";
import type { ISafeUser, ISignUpUser } from "../users/users.interface";
import { authModels } from "./auth.model";

class AuthService {
  async signUpUser(user: ISignUpUser) {
    const { name, email, password, role = "contributor" } = user;
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // create user
    const payload: ISignUpUser = { name, email, password: hashPassword, role };
    const result = await authModels.signUpUserInDB(payload);

    console.log("service==========", result);
    return result;
  }
}

export default new AuthService();
