import express from "express";
import * as http from "http";
import * as cors from "cors";
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

import {config} from "dotenv";

config();

app.use(
  cors.default({
    origin: process.env.HOST_URL,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());



server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// import { Client, GatewayIntentBits } from "discord.js";
// const { token } = require('./config.json');

// // Create a new client instance
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// // When the client is ready, run this code (only once)
// client.once('ready', () => {
// 	console.log('Ready!');
// });

// // Login to Discord with your client's token
// client.login(token);
