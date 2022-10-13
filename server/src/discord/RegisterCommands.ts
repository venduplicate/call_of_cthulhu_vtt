/* eslint-disable @typescript-eslint/no-var-requires */
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import path from "node:path";

let clientId = "";
let guildId = ""
let token = ""

if (process.env.GUILD_ID != undefined){
  guildId = process.env.GUILD_ID;
}
if (process.env.DISCORD_TOKEN != undefined){
  token = process.env.DISCORD_TOKEN;
}
if (process.env.CLIENT_ID != undefined){
  clientId = process.env.CLIENT_ID;
}

export async function register_commands() {
  console.log("register commands init init");
  const commands = [];
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: string) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(pathToFileURL(filePath).toString())
    commands.push(command.default.data.toJSON());
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
