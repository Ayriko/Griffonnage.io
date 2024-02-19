import React, {
  createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState,
} from 'react';
import { RoleEnum, type User } from '../types/User.tsx';
import { socket } from '../socket.ts';
import type { Line as LineType } from '../types/Line.tsx';

interface GameContextProps {
  Word: string;
  setWord: Dispatch<SetStateAction<string>>;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  TimerActive: boolean;
  setTimerActive: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  startGame: (word: string) => void;
  endGame: () => void;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  players: string[];
  setPlayers: Dispatch<SetStateAction<string[]>>;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
  lines: LineType[],
  setLines: Dispatch<SetStateAction<LineType[]>>
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

function GameProvider({ children }: { children: React.ReactNode }) {
  const [Word, setWord] = useState('');
  const [TimerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [players, setPlayers] = useState<string[]>([]);
  const [user, setUser] = useState<User>({
    guessed: false,
    id: 0,
    isMaster: false,
    role: RoleEnum.ARTIST,
    score: 0,
    username: '',
  });
  const [roomId, setRoomId] = useState<string>('');
  const [lines, setLines] = React.useState<LineType[]>([]);

  const endGame = () => {
    if (user.isMaster) {
      setSeconds(60);
      setTimerActive(false);

      const userId = localStorage.getItem('id');

      socket.emit('endRound', roomId, userId ?? user.id);

      socket.on('cleared', (currentLines: LineType[]) => {
        setLines(currentLines.concat());
      });
    }
    setWord('');
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let interval: string | number | NodeJS.Timeout | undefined;

    if (Word) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (seconds <= 0) {
      clearInterval(interval);
      endGame();
    }

    return () => {
      clearInterval(interval);
    };
  }, [Word, seconds]);

  const startGame = (word: string) => {
    socket.emit('startRound', roomId, word);

    socket.on('setRound', (endDate: number) => {
      setSeconds(endDate);
      setWord(word);
      setTimerActive(true);
    });
  };

  return (
    <GameContext.Provider value={{
      Word,
      setWord,
      seconds,
      setSeconds,
      TimerActive,
      setTimerActive,
      startGame,
      endGame,
      user,
      setUser,
      players,
      setPlayers,
      roomId,
      setRoomId,
      lines,
      setLines,
    }}
    >
      {children}
    </GameContext.Provider>
  );
}

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext doit être utilisé à l'intérieur de GameProvider");
  }
  return context;
};

export { GameContext, useGameContext, GameProvider };
