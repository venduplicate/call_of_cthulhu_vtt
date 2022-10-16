import { keeper, CommandCollection } from "../../discord/keeper";

export default {
  name: "getCommands",
  once: false,
  async execute(callback: (commands: CommandCollection) => void) {
    callback(keeper.commands);
  },
};
