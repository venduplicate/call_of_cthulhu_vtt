import type { Server } from "socket.io";

export interface FileBase {
  name: string;
  once: boolean;
  execute: (...args: unknown[]) => Promise<void>
}
interface ClientToServerEvents {
  "create-room": (sessionId: string) => void;
  AddCustomRoll: () => void;
  AddInvestigator: () => void;
  AddToInitiative: () => void;
  DeleteAllCustomRolls: () => void;
  DeleteSingleCustomRoll: () => void;
  DeleteAllInitiative: () => void;
  DeleteInvestigator: () => void;
  DeleteOneInitiative: () => void;
  Next: () => void;
  Previous: () => void;
  RollDiceDiscord: () => void;
  SkillChallenge: () => void;
  UpdateAllInitiative: () => void;
  UpdateCustomRoll: () => void;
  UpdateInvestigator: () => void;
  UpdateSingleInitiative: () => void;
  SendInitiativeToDiscord: () => void;
  RoundStart: () => void;
  GetDiceLogs: () => void;
}

interface ServerToClientEvents {
  AddCustomRoll: () => void;
  AddInvestigator: () => void;
  AddToInitiative: () => void;
  DeleteAllCustomRolls: () => void;
  DeleteSingleCustomRoll: () => void;
  DeleteAllInitiative: () => void;
  DeleteInvestigator: () => void;
  DeleteOneInitiative: () => void;
  Next: () => void;
  Previous: () => void;
  UpdateAllInitiative: () => void;
  UpdateCustomRoll: () => void;
  UpdateInvestigator: () => void;
  UpdateSingleInitiative: () => void;
  RoundStart: () => void;
}

export const clienToServerStrings = {
  AddCustomRoll: "AddCustomRoll",
  createroom: "create-room",
  AddInvestigator: "AddInvestigator",
  DeleteAllCustomRolls: "DeleteAllCustomRolls",
  DeleteSingleCustomRoll: "DeleteSingleCustomRoll",
  DeleteAllInitiative: "DeleteAllInitiative",
  DeleteInvestigator: "DeleteInvestigator",
  DeleteOneInitiative: "DeleteOneInitiative",
  Next: "Next",
  Previous: "Previous",
  RollDiceDiscord: "RollDiceDiscord",
  SkillChallenge: "SkillChallenge",
  UpdateAllInitiative: "UpdateAllInitiative",
  UpdateCustomRoll: "UpdateCustomRoll",
  UpdateInvestigator: "UpdateInvestigator",
  UpdateSingleInitiative: "UpdateSingleInitiative",
  SendInitiativeToDiscord: "SendInitiativeToDiscord",
  RoundStart: "RoundStart",
  GetDiceLogs: "GetDiceLogs",
};

export type IOServer = Server<ClientToServerEvents, ServerToClientEvents>;
