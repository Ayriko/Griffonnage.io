import {Socket} from "socket.io";

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

type Line = {
  tool: string;
  points: (number | undefined)[];
  strokeWidth: number;
  strokeColor: string;
  closed: boolean;
  fill: (string | undefined);
};

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messageHistory = [''];
let globalLines: Line[] = [];

io.on("connection", (socket: Socket) => {

  socket.on("example-event", () => {
    socket.emit("server-response", "Réponse du serveur");
  });

  socket.on('message', (msg) => {
    messageHistory.push(msg)
    io.emit('message to client', messageHistory)
  });

  socket.on('firstConnection', () => {
    io.emit('getMessageHistory', messageHistory)
  })

  socket.on('getLines', () => {
    io.emit('getLines', globalLines)
  })

  socket.on('setLines', (lines: Line[]) => {
    globalLines = [ ...globalLines, ...lines]
  })

  socket.on('clear', () => {
    globalLines = []
    io.emit('clear', globalLines)
  })
});

const PORT = 5137;

server.listen(PORT, () => {
  console.log(`Serveur Socket.io écoutant sur le port ${PORT}`);
});
