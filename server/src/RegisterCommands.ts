const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require('discord.js');
const path = require("path");
import * as dotenv from 'dotenv'
dotenv.config({path:"c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env"})


const clientId = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;

export async function register_commands() {
  const commands = [];
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: any) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

 if (process.env.ENVIRONMENT == 'DEVELOPMENT') {
      console.log("development");
      await rest
        .put(Routes.applicationGuildCommands(clientId, guildID), {
          body: commands,
        })
        .then(() =>
          console.log("Successfully registered application commands.")
        )
        .catch(console.error);
      }
    else {
      console.log("default");
      await rest
        .put(Routes.applicationCommands(clientId), { body: commands })
        .then(() =>
          console.log("Successfully registered application commands.")
        )
        .catch(console.error);
  }
}
