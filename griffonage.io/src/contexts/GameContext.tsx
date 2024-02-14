import React, {
  createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState,
} from 'react';
import { RoleEnum, type User } from '../types/User.tsx';

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

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let interval: string | number | NodeJS.Timeout | undefined;

    if (TimerActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [TimerActive]);

  const startGame = (word: string) => {
    setWord(word);
    setTimerActive(true);
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
      endGame,
      user,
      setUser,
      players,
      setPlayers,
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
