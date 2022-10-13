/* eslint-disable @typescript-eslint/no-var-requires */
import { type Socket, Server } from "socket.io";
import { Collection } from "discord.js";
import path from "node:path";
import fs from "node:fs";
import { logger } from "../utilities/Logging.js";
import http from "http";
import sonic from "../local-events/sonic.js";
import { FileBase, IOServer } from "./types.js";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  createDirName,
  createPath,
  getFiles,
  getDefaultData,
} from "../utilities/PathCreation.js";
const socketFiles: Collection<string, FileBase> = new Collection();

async function initRegisterSockets() {
  try {
    logger.info("initiating registering sockets to collection");
    const socketsPath = createPath(createDirName(import.meta.url), "events");
    const eventFiles = await getFiles(import.meta.url, "events");
    for (const file of eventFiles) {
      const event = await getDefaultData(socketsPath, file);
      socketFiles.set(event.name, event);
    }
  } catch (error) {
    console.log(error, "registersockets");
  }
}
function onConnection(socket: Socket) {
  socket.on("create-room", (room: string) => {
    logger.debug(`creating room ${room}`, "create");
    socket.join(room);
  });
  socketFiles.each((item: FileBase) => {
    socket.on(item.name, (...args: unknown[]) => {
      logger.debug(`executing event ${item.name}`, item.name);
      item.execute(socket, sonic, ...args);
    });
  });
}

export async function socketInit(
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) {
  logger.info("creating IO server connection");
  const io: IOServer = new Server(server, {
    cors: {
      origin: process.env.HOST_URL,
      methods: ["GET", "POST"],
    },
  });
  await initRegisterSockets();
  logger.info("registering socket events");
  io.on("connection", onConnection);

  return io;
}

// const jwtSecret = process.env.JWT_SECRET;
// const expirationString = "1h";

// export async function signJWT(clientToken: string){
//   const token = jwt.sign({data: {token: }},jwtSecret,{expiresIn: expirationString})
//   return token
// }

// export function jwtAuth(socket: Socket, next: (err?: ExtendedError | undefined) => void){
//   const token = socket.data.token;
//   if (token == null) {
//     socket.emit("invalidAuth")
//     next(new Error("Invalid auth, "))
//   }
//   const verified = jwt.verify(token,jwtSecret)
//   next(verified)
// }
