import { KeeperClient, keeper } from "../../discord/keeper.js";

export default {
  name: "getKeeperClient",
  once: false,
  async execute(callback: (client: KeeperClient) => void) {
    callback(keeper);
  },
};
