import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { ContextMenuCommandInteraction, Message } from "discord.js";
import winston from "winston";
import { SonicEmitter } from "../../local-events/sonic.js";
import { DiceHandler } from "../../utilities/DiceRoll";

function isMessage(interaction: ContextMenuCommandInteraction | Message): interaction is Message {
    return (interaction as Message).content !== undefined
}

export function rollDice(interaction: ContextMenuCommandInteraction | Message, sonic: SonicEmitter, logger: winston.Logger) {
    if (interaction.channel == null) return;
    const sessionId = interaction.channel.id;
    
    let content = "";

    if (isMessage(interaction)){
        content = interaction.content[0]
    }
    else {
        content = interaction.commandName;
    }
    sonic.emit("getDice", async (diceRoller: DiceHandler) => {
        logger.info(`separating dice from comment`)
        const {diceRoll, comment} = diceRoller.roll(sessionId,content);
        logger.debug(comment)
        logger.info("rolling dice")
        sonic.emit("getRedisRollLogger", async (client) => {
            client.logRoll(sessionId,`${comment}`,diceRoll)
        })
        if (comment !== null) {
            await interaction.reply(`You rolled: ${diceRoll} : ${comment}`)
        }
        else {
            await interaction.reply(`You rolled: ${diceRoll}`)
        }
    })
}