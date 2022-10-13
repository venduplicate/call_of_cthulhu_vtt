import DBBase from "./DBBase.js";
import { UserInterface, UserConverter } from "../schemas/User.js";
export class UserBase extends DBBase {
  users: string;
  constructor() {
    super();
    this.users = "users";
  }
  getUserRef(userId: string) {
    return this.db.collection(this.users).doc(userId);
  }
  async getUserData(userId: string) {
    try {
      const userRef = this.getUserRef(userId);
      const data = await userRef.withConverter(UserConverter).get();
      return data;
    } catch (error) {
      return undefined;
    }
  }
}
