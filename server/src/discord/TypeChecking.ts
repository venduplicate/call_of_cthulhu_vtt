import type {
  ContextMenuCommandInteraction,
  Message,
  ChatInputCommandInteraction,
} from "discord.js";

export function isMessage(
  interaction:
    | ContextMenuCommandInteraction
    | Message
    | ChatInputCommandInteraction
): interaction is Message {
  return (interaction as Message).content !== undefined;
}

export function isChatInputInteraction(
  interaction:
    | ContextMenuCommandInteraction
    | Message
    | ChatInputCommandInteraction
): interaction is ChatInputCommandInteraction {
  return (interaction as ChatInputCommandInteraction).isChatInputCommand();
}

export function isContextMenuCommand(
  interaction:
    | ContextMenuCommandInteraction
    | Message
    | ChatInputCommandInteraction
): interaction is ContextMenuCommandInteraction {
  return (interaction as ContextMenuCommandInteraction).isContextMenuCommand();
}
