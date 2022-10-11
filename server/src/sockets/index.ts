import { type Socket, Server } from "socket.io";
import { Collection } from "discord.js";
import * as path from "node:path";
import * as fs from "node:fs";
import { logger } from "../utilities/Logging.js";
import * as http from "http";
import * as dotenv from 'dotenv'
dotenv.config({path:"c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env"})
import sonic from "../local-events/index.js"


const socketFiles = new Collection()

async function initRegisterSockets() {
    logger.info("initiating registering sockets to collection")
    const socketsPath = path.join(__dirname,"files");
    const socketsFolders = fs.readdirSync(socketsPath);
    for (const folder of socketsFolders) {
      if (
        folder.includes("util") ||
        folder.includes("types") ||
        folder.includes("index")
      )
        continue;
      const filePath = path.join(socketsPath, folder);
      const socketsFiles = fs
        .readdirSync(filePath)
        .filter((file: any) => file.endsWith(".js"));
      for (const file of socketsFiles) {
        const filePath = path.join(socketsPath, folder, file);
        const socketEvent = require(filePath);

        socketFiles.set(socketEvent.name, socketEvent);
      }
    }
  }
function onConnection(socket: Socket) {
    socket.on("create", (room: any) => {
      logger.debug(`creating room ${room}`, "create");
      socket.join(room);
    });
    socketFiles.each((item: any) => {
      socket.on(item.name, (...args: any) => {
        logger.debug(`executing event ${item.name}`, item.name);
        item.execute(socket,sonic, ...args);
      });
    })
  }

export async function socketInit(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
    logger.info("creating IO server connection")
    const io = new Server(server, {
        cors: {
          origin: process.env.HOST_URL,
          methods: ["GET", "POST"],
        },
      });
    await initRegisterSockets();
    logger.info("registering socket events")
    io.on("connection", onConnection)

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