import type { Socket } from "socket.io-client";
import type {
  InitiativeMap,
  InitiativeArray,
  InitiativeInterface,
} from "./Initiative";

export interface ClientToServerEvents {
  "create-room": (sessionId: string) => void;
  AddCustomRoll: () => void;
  AddInvestigator: () => void;
  AddToInitiative: () => void;
  DeleteAllCustomRolls: () => void;
  DeleteSingleCustomRoll: () => void;
  DeleteAllInitiative: () => void;
  DeleteInvestigator: () => void;
  DeleteSingleInitiative: (id: string) => void;
  Next: () => void;
  Previous: () => void;
  RollDiceDiscord: () => void;
  SkillChallenge: () => void;
  UpdateAllInitiative: () => void;
  UpdateCustomRoll: () => void;
  UpdateInvestigator: () => void;
  UpdateSingleInitiative: (data: {
    sessionId: string;
    initiative: InitiativeInterface;
  }) => void;
  SendInitiativeToDiscord: () => void;
  RoundStart: () => void;
  GetDiceLogs: () => void;
  GetInitiative: (
    callback: (data: {
      initiative: InitiativeMap | InitiativeArray;
      isSorted: boolean;
      currentNumber: number;
      nextNumber: number;
      previousNumber: number;
    }) => void
  ) => void;
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

export type ClientSocketType = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;
