import React, {
  createContext, type Dispatch, type SetStateAction, useCallback, useContext, useState,
} from 'react';
import { RoleEnum, type User } from '../types/User.tsx';
import { socket } from '../socket.ts';

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
  startTimer: () => void;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  players: string[];
  setPlayers: Dispatch<SetStateAction<string[]>>;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
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

  const startTimer = useCallback(() => {
    // eslint-disable-next-line no-undef
    let interval: string | number | NodeJS.Timeout | undefined;

    if (TimerActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      console.log('intervale', interval);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [TimerActive]);

  const startGame = (word: string) => {
    socket.emit('startRound', roomId, word);

    socket.on('setRound', (endDate: number) => {
      setSeconds(endDate);
      setWord(word);
      setTimerActive(true);
    });
  };

  const endGame = () => {
    setWord('');
    setSeconds(60);
    setTimerActive(false);
  };

  const addPlayer = (playerName: string) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerName]);
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
      startTimer,
      endGame,
      user,
      setUser,
      players,
      setPlayers,
      roomId,
      setRoomId,
    }}
    >
      {children}
    </GameContext.Provider>
  );
}

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useMotContext doit être utilisé à l'intérieur de GameProvider");
  }
  return context;
};

export { GameContext, useGameContext, GameProvider };
