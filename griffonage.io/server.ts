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

const messageHistory: Chat[] = [];
let globalLines: Line[] = [];
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

  socket.on('example-event', () => {
    socket.emit('server-response', 'Réponse du serveur');
  });

  socket.on('message', (msg: string, username: string) => {
    messageHistory.push({ message: msg, user: username });
    io.emit('message to client', messageHistory);
  });

  socket.on('firstConnection', () => {
    io.emit('getMessageHistory', messageHistory);
  });

  socket.on('getLines', () => {
    io.emit('getLines', globalLines);
  });

  socket.on('setLines', (lines: Line[]) => {
    globalLines = [...globalLines, ...lines];
  });

  socket.on('clear', () => {
    globalLines = [];
    io.emit('clear', globalLines);
  });
});

const PORT = 5137;

server.listen(PORT, () => {
  console.log(`Serveur Socket.io écoutant sur le port ${PORT}`);
});
