import { SelectMenuInteraction } from "discord.js";
import type { CommandCollection } from "../keeper.js";
import type { SonicEmitter } from "../../local-events/sonic.js";
import { logger } from "../../utilities/Logging.js";
import winston from "winston";
import { RollRedis } from "../../data/redis/RollRedis.js";
import { CustomRollFireStore } from "../../data/firestore/CustomRollFirestore.js";
import { CustomRoll } from "../../data/schemas/Roll.js";

export default {
  name: "interactionCreate",
  once: false,
  async execute(
    interaction: SelectMenuInteraction,
    sonic: SonicEmitter,
    logger: winston.Logger,
    commands: CommandCollection
  ) {
    if (!interaction.isSelectMenu()) return;
    const value = interaction.values[0];
    if (interaction.channel == null) return;
    const sessionId = interaction.channel.id;
    switch (interaction.customId) {
      case "playerMenu":
        sonic.emit("getRollRedis", async (handlerRedis: RollRedis) => {
          const rollCache = await handlerRedis.getCacheRoll(value);
          const idArray = value.split(":");
          const rollId = idArray[0];
          const playerId = idArray[1];
          if (rollCache == null) throw new Error("Roll Cache not found");
          const rollObject = JSON.parse(rollCache);
          const rollData: CustomRoll = {
            notation: rollObject.notation,
            name: rollObject.name,
            id: rollId,
            investigatorId: playerId,
          };

          sonic.emit(
            "getCustomRollFirestore",
            async (handlerRoll: CustomRollFireStore) => {
              handlerRoll.addRoll(sessionId, rollData);
              await interaction.reply("Custom roll has been added")
            }
          );
        });
        break;
      default:
        break;
    }
  },
};
