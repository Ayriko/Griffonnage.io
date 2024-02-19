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

      users[parseInt(userId, 10) - 1].role = RoleEnum.ARTIST;

      if (userArtist.length) {
        users[parseInt(userId, 10) - 1].role = RoleEnum.GUESSER;
      }

      rooms[roomId].players.push(userId);
      rooms[roomId].players = [...new Set(rooms[roomId].players)];
    }

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
    io.to(roomId).emit('cleared', globalLines[roomId]);
  });

  socket.on('getRooms', () => {
    io.emit('emitRooms', currentRooms || []);
  });

  socket.on('updateRooms', (roomsId: string[]) => {
    currentRooms = [...roomsId];
  });

  socket.on('userHasGuessed', (roomId: string, userId: string) => {
    rooms[roomId].guessed += 1;
    users[parseInt(userId, 10) - 1].guessed = true;
    io.to(roomId).emit('userHasGuessed', rooms[roomId].guessed);
  });

  socket.on('getPlayersByRoomId', (roomId: string) => {
    const usernamePlayers = [];
    const { players } = rooms[roomId];
    for (let i = 0; i < players.length; i += 1) {
      const tmp = users[parseInt(players[i], 10) - 1];
      usernamePlayers.push(tmp);
    }
    io.to(roomId).emit('playerList', usernamePlayers);
  });

  socket.on('endRound', (roomId: string, playerId: string) => {
    const roomGuesser = rooms[roomId].players.filter(
      (playerIdInRoom: string) => users[parseInt(playerIdInRoom, 10) - 1].role === RoleEnum.GUESSER,
    );
    const artistId = roomGuesser[Math.floor(Math.random() * roomGuesser.length)];
    users[parseInt(artistId, 10) - 1].role = RoleEnum.ARTIST;

    rooms[roomId].players.forEach((playerIdInRoom: string) => {
      if (playerIdInRoom === artistId) {
        return;
      }
      users[parseInt(playerIdInRoom, 10) - 1].role = RoleEnum.GUESSER;
    });
    rooms[roomId].wordToGuess = '';

    io.to(roomId).emit('endRound', users[parseInt(playerId, 10) - 1]);
  });

  socket.on('userCreatedRoom', (id: string) => {
    users[parseInt(id, 10) - 1].isMaster = true;
    socket.emit('userCreatedRoom', users[parseInt(id, 10) - 1]);
  });
});

const PORT = 5137;

server.listen(PORT, () => {
  console.log(`Serveur Socket.io écoutant sur le port ${PORT}`);
});
