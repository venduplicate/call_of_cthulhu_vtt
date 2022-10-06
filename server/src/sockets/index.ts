import { type Socket, Server } from "socket.io";
import { Collection } from "discord.js";
import * as path from "node:path";
import * as fs from "node:fs";
import { logger } from "../utilities/Logging";
import * as http from "http";
require("dotenv").config();

const socketFiles = new Collection()

async function initRegisterSockets() {
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
      logger._debug(`creating room ${room}`, "create");
      socket.join(room);
    });
    socketFiles.each((item: any) => {
      socket.on(item.name, (...args: any) => {
        logger._debug(`executing event ${item.name}`, item.name);
        item.execute(socket, ...args);
      });
    })
  }

export async function socketInit(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
    const io = new Server(server, {
        cors: {
          origin: process.env.HOST_URL,
          methods: ["GET", "POST"],
        },
      });
    await initRegisterSockets();
    io.on("connection", onConnection)

    return io;
}