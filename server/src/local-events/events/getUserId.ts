import userDiscordHandler, {
  type DiscordFirestore,
} from "../../data/firestore/DiscordFirestore";
import type { SonicEmitter } from "../sonic";
import type { DiscordUserSchema, UserSchema } from "../../data/schemas/User";
import DatabaseError from "../../errors/DatabaseError";

export default {
  name: "getUserIDFromDiscordID",
  once: false,
  async execute(
    discordId: string,
    callback: (playerId: DiscordUserSchema) => void,
    sonic: SonicEmitter
  ) {
    const playerId = await userDiscordHandler.getUserIdFromDiscordId(discordId);
    if (playerId !== undefined) {
      callback(playerId.data() as DiscordUserSchema);
    } else {
      sonic.emit(
        "error",
        new DatabaseError(`unable to find discord ID ${discordId}`),
        sonic
      );
    }
  },
};
