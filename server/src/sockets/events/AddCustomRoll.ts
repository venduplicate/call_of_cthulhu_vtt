import { Socket } from "socket.io";
import sonic, { SonicEmitter } from "../../local-events/sonic.js";

export default {
  name: "AddCustomRoll",
  once: false,
  async execute(
    socket: Socket,
    sonic: SonicEmitter,
    data: { sessionId: string; notation: string; investigatorId: string }
  ) {
    console.log("test");
  },
};
