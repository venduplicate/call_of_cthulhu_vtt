import { io } from "src/index";


module.exports = {
  name: "getIO",
  once: false,
  async execute(callback: (client: typeof io) => void) {
    callback(io)
  },
};