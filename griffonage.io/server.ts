import { Server, Socket } from 'socket.io';
import express from 'express';
import * as http from 'http';

enum RoleEnum {
  ARTIST = 'artist',
  GUESSER = 'guesser'
}

type User = {
  id: number,
  username: string,
  role: RoleEnum,
  isMaster: boolean,
  score: number,
  guessed: boolean,
}

type Line = {
  tool: string;
  points: (number | undefined)[];
  strokeWidth: number;
  strokeColor: string;
  closed: boolean;
  fill: (string | undefined);
};

type Chat = {
  user: string,
  message: string,
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messageHistory: { [key: string]: Chat[] } = {};
const globalLines: { [key: string]: Line[] } = {};
const users: User[] = [];

io.on('connection', (socket: Socket) => {
  socket.on('setNewUser', (username: string) => {
    users.push({
      guessed: false,
      id: users.length + 1,
      isMaster: false,
      role: RoleEnum.ARTIST,
      score: 0,
      username,
    });
    socket.emit('getUser', users[users.length - 1]);
  });

  socket.on('getUserById', (id: number) => {
    socket.emit('getUserById', users[id - 1]);
  });

  socket.on('setupRoomId', (roomId: string) => {
    if (!messageHistory[roomId]) {
      messageHistory[roomId] = [];
    }
    if (!globalLines[roomId]) {
      globalLines[roomId] = [];
    }

    socket.join(roomId);
  });

  socket.on('message', (msg: string, username: string, roomId: string) => {
    messageHistory[roomId].push({ message: msg, user: username });
    io.to(roomId).emit('message to client', messageHistory[roomId]);
  });

  socket.on('firstConnection', (roomId) => {
    io.to(roomId).emit('getMessageHistory', messageHistory[roomId]);
  });

  socket.on('getLines', (roomId: string) => {
    io.to(roomId).emit('emitLines', globalLines[roomId] || []);
  });

  socket.on('updateLines', (lines: Line[], roomId: string) => {
    globalLines[roomId] = [...lines];
  });

  socket.on('clear', (roomId: string) => {
    globalLines[roomId] = [];
    io.to(roomId).emit('cleared', globalLines);
  });
});

const PORT = 5137;

server.listen(PORT, () => {
  console.log(`Serveur Socket.io écoutant sur le port ${PORT}`);
});
