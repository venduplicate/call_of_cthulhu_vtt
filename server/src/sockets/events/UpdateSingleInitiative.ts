import { Socket } from "socket.io";
import { SonicEmitter } from "../../local-events/sonic.js";
import { InvestigatorFirestore } from "../../data/schemas/Characters/Investigator.js";

export default {
  name: "UpdateSingleInitiative",
  once: false,
  async execute(
    socket: Socket,
    sonic: SonicEmitter,
    data: { player_id: string; investigator: InvestigatorFirestore }
  ) {
    console.log("test");
  },
};