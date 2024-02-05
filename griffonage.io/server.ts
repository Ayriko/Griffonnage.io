import {Socket} from "socket.io";

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messageHistory = [''];

io.on("connection", (socket: Socket) => {
  console.log("Nouvelle connexion Socket.io");

  socket.on("example-event", (data) => {
    console.log("Client dit:", data);
    socket.emit("server-response", "Réponse du serveur");
  });

  socket.on('message', (msg) => {
    messageHistory.push(msg)
    io.emit('message to client', messageHistory)
  });

  socket.on('firstConnection', () => {
    console.log('first co')
    io.emit('getMessageHistory', messageHistory)
  })
});

const PORT = 5137;

server.listen(PORT, () => {
  console.log(`Serveur Socket.io écoutant sur le port ${PORT}`);
});
