import userHandler from "../../data/firestore/Users/UserBase";
import type { SonicEmitter } from "../sonic";
import { UserSchema } from "../../data/schemas/User";
import DatabaseError from "../../errors/DatabaseError";

export default {
  name: "getUserFromFirestore",
  once: false,
  async execute(
    playerId: string,
    callback: (user: UserSchema) => void,
    sonic: SonicEmitter
  ) {
    const user = await userHandler.getUserData(playerId);

    if (user !== undefined) {
      const data = user.data() as UserSchema;
      callback(data);
    } else {
      sonic.emit("error", new DatabaseError(`Could not find user ${playerId}`));
    }
  },
};
