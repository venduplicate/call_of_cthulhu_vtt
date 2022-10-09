import express from "express";
import * as http from "http";
import * as cors from "cors";
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
import {socketInit} from "./sockets/index.js";
import { keeper } from "./discord/index.js";
import * as dotenv from 'dotenv'
dotenv.config({path:"c:/Users/AndrewKent/Documents/Development/call_of_cthulhu_vtt/server/src/.env"})

app.use(
  cors.default({
    origin: process.env.HOST_URL,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

export const io = await socketInit(server)
keeper.init()



server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

