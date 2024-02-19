import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title/Title.tsx';
import { useGameContext } from '../contexts/GameContext.tsx';
import { socket } from '../socket.ts';
import type { User } from '../types/User.tsx';
import GameList from '../components/GameList/GameList.tsx';
import Games from '../atoms/Games.tsx';

function Homepage(): React.JSX.Element {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const { user, setUser } = useGameContext();
  const currentGames = useRecoilValue(Games);
  const setCurrentGames = useSetRecoilState<string[]>(Games);
  const [maxGamesReached, setMaxGamesReached] = useState(false);

  useEffect(() => {
    socket.emit('getRooms');

    // eslint-disable-next-line no-shadow
    socket.on('emitRooms', (currentGames: string[]) => {
      setCurrentGames(currentGames);
    });
  }, [setCurrentGames]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit('setNewUser', username);

    socket.on('getUser', (userData: User) => {
      setUser(userData);
      localStorage.setItem('id', String(userData.id));
    });
  };

  const handleCreateGame = () => {
    if (currentGames.length >= 5) {
      setMaxGamesReached(true);
      return;
    }

    const newGameId = (currentGames.length + 1).toString();

    const updatedGames = [...currentGames, newGameId];
    setCurrentGames(updatedGames);
    socket.emit('updateRooms', updatedGames);

    socket.emit('userCreatedRoom', localStorage.getItem('id'));
    socket.on('userCreatedRoom', (userData: User) => {
      setUser(userData);
    });
    navigate(`/game/${newGameId}`);
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="mt-40 mb-20 ">
        <Title size="text-9xl" />
      </div>
      <div className="flex flex-col items-center gap-5">
        {(user.username === '')
          ? (
            <form className="flex space-x-5" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Entrez votre username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="flex-grow px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-black"
              />
              <button className="bg-yellow-500  px-10 py-2 rounded-md text-white" type="submit">Confirmer</button>
            </form>
          )
          : (
            <p style={{ color: 'white' }}>
              Bienvenue
              {' '}
              {user.username}
            </p>
          )}
        {currentGames.length > 0 && user.username !== '' && (
          <GameList />
        )}
        {maxGamesReached && (
          <p style={{ color: 'red' }}>Le nombre maximum de parties en cours est atteint.</p>
        )}
        <button
          type="button"
          disabled={user.username === ''}
          onClick={handleCreateGame}
          className="bg-blue-500  px-10 py-2 rounded-md text-white "
        >
          Créer une partie
        </button>
      </div>
    </div>
  );
}

export default Homepage;
