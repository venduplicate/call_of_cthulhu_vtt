import { Socket } from "socket.io";
import { SonicEmitter } from "../../local-events/sonic.js";
import { InvestigatorFirestore } from "../../data/schemas/Investigator.js";

export default {
  name: "UpdateInvestigator",
  once: false,
  async execute(
    socket: Socket,
    sonic: SonicEmitter,
    data: { player_id: string; investigator: InvestigatorFirestore }
  ) {
    console.log("test");
  },
};