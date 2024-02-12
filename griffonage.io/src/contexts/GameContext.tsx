import React, { createContext, useState, useContext, type Dispatch, type SetStateAction, useEffect } from 'react';

interface GameContextProps {
    Word: string;
    setWord: Dispatch<SetStateAction<string>>;
    seconds: number;
    setSeconds: Dispatch<SetStateAction<number>>;
    TimerActive : boolean;
    setTimerActive : Dispatch<SetStateAction<boolean>>;
    startGame: (word: string) => void;
    endGame: () => void;
    username : string;
    setUsername : Dispatch<SetStateAction<string>>;
    players : string[];
    setPlayers: Dispatch<SetStateAction<string[]>>;
  }

const GameContext = createContext<GameContextProps | undefined>(undefined);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [Word, setWord] = useState('');
  const [TimerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [username, setUsername] = useState('player1');
  const [players, setPlayers] = useState<string[]>([]);

  



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

  const addPlayer = (playerName: string) => {
    setPlayers(prevPlayers => [...prevPlayers, playerName]);
};





  return (
    <GameContext.Provider value={{ Word, setWord, seconds, setSeconds, TimerActive, setTimerActive, startGame, endGame, username, setUsername, players, setPlayers}}>
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
