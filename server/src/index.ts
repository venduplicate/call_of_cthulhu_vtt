/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as dotenv from "dotenv";
dotenv.config({
  path: "c:/Users/Eleven/Documents/Development/call_of_cthulhu_vtt/server/src/.env",
});
import express from "express"
import http from "http";
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
import { socketInit } from "./sockets/socketindex.js";
import { keeper } from "./discord/keeper.js"
import sonic from "./local-events/sonic.js";
import cors from "cors";

app.use(
  cors({
    origin: process.env.HOST_URL,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.get("/user/investigators", (req, res) => {
  // const dbCall = new DB();
  // const investigator = dbcall.getInvestigator(userId, investigatorId);
  // res.json(investigator)
})

export const io = await socketInit(server);
keeper.init();
sonic.init();

server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
