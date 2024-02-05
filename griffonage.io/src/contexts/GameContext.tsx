import React, { createContext, useState, useContext, type ReactNode, type Dispatch, type SetStateAction, useEffect } from 'react';

interface GameContextProps {
    Word: string;
    setWord: Dispatch<SetStateAction<string>>;
    seconds: number;
    setSeconds: Dispatch<SetStateAction<number>>;
    TimerActive : boolean;
    setTimerActive : Dispatch<SetStateAction<boolean>>;
    startGame: (word: string) => void;
    endGame: () => void;
  }

const GameContext = createContext<GameContextProps | undefined>(undefined);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [Word, setWord] = useState('');
  const [TimerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(60);



  useEffect(() => {
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


  const startGame = (word:  string) => {
    setWord(word);
    setTimerActive(true);
  }

  const endGame = () => {
    setWord('');
    setSeconds(60);
    setTimerActive(false);
  }





  return (
    <GameContext.Provider value={{ Word, setWord, seconds, setSeconds, TimerActive, setTimerActive, startGame, endGame}}>
      {children}
    </GameContext.Provider>
  );
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useMotContext doit être utilisé à l'intérieur de GameProvider");
  }
  return context;
};

export { GameContext, useGameContext, GameProvider };
