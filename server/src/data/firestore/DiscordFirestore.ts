import DBBase from "./DBBase.js";
import { loggingUtilWrapper } from "../../utilities/Logging.js";
export class DiscordFirestore extends DBBase {
  discord: string;
  constructor() {
    super();
    this.discord = "discord";
  }
  getUserDiscordRef(userId: string) {
    return this.db.collection(this.discord).doc(userId);
  }
  async getUserIdFromDiscordId(userId: string) {
    try {
      const userRef = this.getUserDiscordRef(userId);
      const data = await userRef.get();
      return data;
    } catch (error) {
      return undefined;
    }
  }
}

const userDiscordHandler = loggingUtilWrapper(new DiscordFirestore());

export default userDiscordHandler;
