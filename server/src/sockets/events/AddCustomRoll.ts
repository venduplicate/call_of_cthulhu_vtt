import { Socket } from "dgram";
import sonic, { SonicEmitter } from "../../local-events/index.js";

module.exports = {
  name: "AddCustomRoll",
  once: false,
  async execute(socket: Socket, sonic: SonicEmitter, data: {sessionId: string, notation: string,investigatorId: string}) {

    
    
  },
};