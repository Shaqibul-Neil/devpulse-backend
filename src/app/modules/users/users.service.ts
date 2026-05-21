import type { ISafeUser } from "./users.interface";
import { usersModels } from "./users.model";

class UserService {
  //===========================
  async getAllUsers(): Promise<ISafeUser[]> {
    const res = await usersModels.getAllUsersFromDB();
    return res;
  }
  //===========================
  async getSingleUser(email: string): Promise<ISafeUser> {
    const res = await usersModels.getUserByEmailFromDB(email);
    return res;
  }
}

export default new UserService();
