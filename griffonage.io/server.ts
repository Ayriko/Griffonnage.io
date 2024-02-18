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

type Room = {
  wordToGuess: string,
  roundEnd: Date,
  players: string[],
  guessed: number,
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messageHistory: { [key: string]: Chat[] } = {};
const globalLines: { [key: string]: Line[] } = {};
const users: User[] = [];
const rooms: { [key: string]: Room } = {};
let currentRooms: string[] = [];

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

  socket.on('setupRoom', (roomId: string, userId: string) => {
    if (!messageHistory[roomId]) {
      messageHistory[roomId] = [];
    }

    if (!globalLines[roomId]) {
      globalLines[roomId] = [];
    }

    if (!rooms[roomId]) {
      rooms[roomId] = {
        wordToGuess: '',
        players: [],
        roundEnd: new Date(),
        guessed: 0,
      };
    }

    if (!rooms[roomId].players.includes(userId)) {
      const userArtist = rooms[roomId].players.filter(
        (playerId) => users[parseInt(playerId, 10) - 1].role === RoleEnum.ARTIST,
      );

      console.log('user artist', userArtist);

      users[parseInt(userId, 10) - 1].role = RoleEnum.ARTIST;

      if (userArtist.length) {
        console.log('ya des artist');
        users[parseInt(userId, 10) - 1].role = RoleEnum.GUESSER;
      }

      rooms[roomId].players.push(userId);
      rooms[roomId].players = [...new Set(rooms[roomId].players)];
    }

    console.log('rooms', rooms[roomId], users[parseInt(userId, 10) - 1]);

    socket.join(roomId);
  });

  socket.on('getRoomConfig', (roomId: string) => {
    io.to(roomId).emit('getRoomConfig', rooms[roomId].wordToGuess, Math.trunc((rooms[roomId].roundEnd.getTime() - new Date().getTime()) / 1000));
  });

  socket.on('startRound', (roomId: string, word: string) => {
    rooms[roomId].wordToGuess = word;
    rooms[roomId].roundEnd = new Date();
    rooms[roomId].roundEnd.setSeconds(rooms[roomId].roundEnd.getSeconds() + 60);
    io.to(roomId).emit('setRound', Math.trunc((rooms[roomId].roundEnd.getTime() - new Date().getTime()) / 1000));
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

  socket.on('getRooms', () => {
    io.emit('emitRooms', currentRooms || []);
  });

  socket.on('updateRooms', (rooms: string[]) => {
    currentRooms = [...rooms];
  });
});

const PORT = 5137;

server.listen(PORT, () => {
  console.log(`Serveur Socket.io écoutant sur le port ${PORT}`);
});
