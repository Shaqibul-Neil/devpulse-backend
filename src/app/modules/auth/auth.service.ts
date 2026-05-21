import bcrypt from "bcrypt";
import type { ISafeUser, ISignUpUser } from "../users/users.interface";
import { authModels } from "./auth.model";

class AuthService {
  /*=====================  
        Signup
  ===================== 
  */
  async signUpUser(user: ISignUpUser): Promise<ISafeUser> {
    const { name, email, password, role = "contributor" } = user;
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // create user
    const payload: ISignUpUser = { name, email, password: hashPassword, role };
    const result = await authModels.signUpUserInDB(payload);

    return result;
  }

  /*=====================  
        Login
  ===================== 
  */
}

export default new AuthService();
