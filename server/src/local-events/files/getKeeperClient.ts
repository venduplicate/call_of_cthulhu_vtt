import { KeeperClient, keeper } from "../../discord";

module.exports = {
  name: "getKeeperClient",
  once: false,
  async execute(callback: (client: KeeperClient) => void) {
    callback(keeper)
  },
};