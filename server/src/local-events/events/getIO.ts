import { io } from "../../index.js";

export default {
  name: "getIO",
  once: false,
  async execute(callback: (client: typeof io) => void) {
    callback(io);
  },
};
