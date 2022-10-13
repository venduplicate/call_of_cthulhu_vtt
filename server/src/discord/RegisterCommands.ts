/* eslint-disable @typescript-eslint/no-var-requires */
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import path from "node:path";
import {
  createDirName,
  createPath,
  getFiles,
  getDefaultData,
} from "../utilities/PathCreation.js";

let clientId = "";
let guildId = "";
let token = "";

if (process.env.GUILD_ID != undefined) {
  guildId = process.env.GUILD_ID;
}
if (process.env.DISCORD_TOKEN != undefined) {
  token = process.env.DISCORD_TOKEN;
}
if (process.env.CLIENT_ID != undefined) {
  clientId = process.env.CLIENT_ID;
}

export async function register_commands() {
  const commands = [];
  const commandsPath = createPath(createDirName(import.meta.url), "commands");
  const commandFiles = await getFiles(import.meta.url, "commands");

  for (const file of commandFiles) {
    const command = await getDefaultData(commandsPath, file);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(token);

  if (process.env.ENVIRONMENT == "DEVELOPMENT") {
    await rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      })
      .then(() => console.log("Successfully registered application commands."))
      .catch(console.error);
  } else {
    await rest
      .put(Routes.applicationCommands(clientId), { body: commands })
      .then(() => console.log("Successfully registered application commands."))
      .catch(console.error);
  }
}
