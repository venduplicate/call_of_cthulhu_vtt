import { ActionRowBuilder, SelectMenuBuilder } from "discord.js";
import type { PlayerObject } from "../../data/schemas/Initiative";
import { CustomRoll } from "../../data/schemas/Roll";

// export async function playerSelectmenu(sessionId: string,playerKey: string) {
//   const playerArray = await initiativeHandler.getPlayerNames(sessionId);
//   const selectMenu = new SelectMenuBuilder()
//     .setCustomId("selectPlayers")
//     .setPlaceholder("Nothing selected");

//   playerArray.forEach((item: PlayerObject) => {
//     selectMenu.addOptions({
//       label: `${item.name}`,
//       value: playerKey,
//       description: "",
//     });
//   });

//   const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
//     selectMenu
//   );

//   return row;
// }
