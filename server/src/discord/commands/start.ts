import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import {
  InitiativeFirestore,
  initiativeHandler,
} from "../../data/firestore/Combat/InitiativeFirestore.js";
import { InitiativeArray } from "../../data/schemas/Initiative.js";
import type Initiative from "../../game/Initiative/Initiative.js";
import type { SonicEmitter } from "../../local-events/sonic.js";

export default {
  data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Get the link for the web component."),
  description: `Get the link to your session's web page component.`,
  async execute(sonic: SonicEmitter, interaction: CommandInteraction) {
    if (interaction.channel == null) return;
    const sessionId = interaction.channel.id;
    sonic.emit(
      "getAllnitiativeFromDatabase",
      async (initiativeArray: InitiativeArray) => {
        sonic.emit("info", "retrieving initiative array from firestore");
        sonic.emit(
          "createInitiativeClassHandler",
          initiativeArray,
          (initiativeHandler: Initiative) => {
            sonic.emit(
              "info",
              "sorting array, adding to map, and setting current/next/previous"
            );
            initiativeHandler.startRounds();
            sonic.emit("debug", "iniative sorted, getting firestore handler");
            sonic.emit(
              "getInitiativeFirestore",
              async (initiativeFirestoreHandler: InitiativeFirestore) => {
                sonic.emit(
                  "info",
                  "updating sorted initiative to firestore database"
                );
                sonic.emit(
                  "updateAllInitiativeToDatabase",
                  initiativeFirestoreHandler,
                  initiativeHandler,
                  sessionId
                );
                sonic.emit(
                  "createInitiativeEmbed",
                  initiativeHandler.initiativeMap,
                  async (embed: EmbedBuilder) => {
                    await interaction.reply({
                      content: "Rounds have started",
                      embeds: [embed],
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  },
};
