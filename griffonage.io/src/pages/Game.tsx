import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import WordProposition from '../components/WordProposition/WordProposition.tsx';
import WordToGuess from '../components/WordToGuess/WordToGuess.tsx';
import { useGameContext } from '../contexts/GameContext.tsx';
import Timer from '../components/Timer/Timer.tsx';
import ChatHistory from '../components/Chat/ChatBox.tsx';
import GameCanvas from '../components/Convas/GameCanvas.tsx';
import Player from '../components/Player/Player.tsx';
import Title from '../components/Title/Title.tsx';
import { socket } from '../socket.ts';
import type { User } from '../types/User.tsx';

function Game(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { roomId } = useParams();
  const {
    user,
    setUser,
    Word,
    setWord,
    setSeconds,
    endGame, setRoomId,
    setTimerActive,
  } = useGameContext();

  useEffect(() => {
    const userId = parseInt(localStorage.getItem('id') ?? '', 10);
    socket.emit('getUserById', (userId));

    socket.emit('setupRoom', roomId, userId);
    setRoomId(roomId ?? '1');

    socket.emit('getRoomConfig', roomId, userId);

    socket.on('getRoomConfig', (word: string, secondLeft: number) => {
      if (word) {
        setSeconds(secondLeft);
        setWord(word);
        setTimerActive(true);
      }
    });

    socket.emit('getUserById', userId);

    socket.on('getUserById', (user: User) => {
      if (!user) {
        navigate('/');
      } else {
        setUser(user);
      }
    });

    setIsLoading(false);
  }, []);

  useEffect(() => () => {
    console.log('unmount');
    setTimerActive(false);
  }, [setTimerActive]);

  if (isLoading) {
    return (<p>loading</p>);
  }

  console.log(user.isMaster);

  return (

    <div className="container mx-auto flex flex-col gap-2 items-center justify-center">
      <div className="place-items-start">
        <Title size="text-4xl" />
      </div>
      <div className="bg-white flex flex-row rounded-md items-center w-full justify-between p-2">
        <Timer />
        {(Word)
          ? <WordToGuess />
          : <div className="text-white">coucou</div>}
        <Link to="/">
          <button
            type="button"
            className="p-1 border-4 border-yellow-500 rounded-2xl"
            onClick={() => endGame()}
          >
            Quitter le jeu
          </button>
        </Link>
      </div>
      <div className="flex flex-row gap-2 w-full">
        <div className="rounded-md bg-white p-3 " style={{ width: '200px' }}>
          <Player />
        </div>
        <div className=" flex justify-center ">
          {(Word)
            ? <GameCanvas />
            : <WordProposition />}
        </div>
        <div className=" flex bg-white rounded-md text-left" style={{ width: '320px' }}>
          <ChatHistory />
        </div>
      </div>
    </div>
  );
}

export default Game;
