import type { ISafeUser, IUsers } from "./users.interface";
import { usersModels } from "./users.model";

class UserService {
  /**
   * Retrieves all users.
   * Returns only safe user data (password excluded).
   */
  async getAllUsers(): Promise<ISafeUser[]> {
    const res = await usersModels.getAllUsersFromDB();
    return res;
  }
  /**
   * Retrieves a single user by email.
   * Returns full user data (including password) for internal auth checks.
   */
  async getSingleUser(email: string): Promise<IUsers | undefined> {
    const res = await usersModels.getUserByEmailFromDB(email);
    return res;
  }
}

export default new UserService();
