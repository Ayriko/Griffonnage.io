import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Title from '../components/Title/Title.tsx';
import { useGameContext } from '../contexts/GameContext.tsx';
import { socket } from '../socket.ts';
import type { User } from '../types/User.tsx';

function Homepage(): React.JSX.Element {
  const [username, setUsername] = useState('');
  const { user, setUser } = useGameContext();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit('setNewUser', username);

    socket.on('getUser', (user: User) => {
      setUser(user);
      localStorage.setItem('id', String(user.id));
    });
  };

  const handleStartGame = () => {

  };

  const handleCreateGame = () => {

  };

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="mt-40 mb-20 ">
        <Title size="text-9xl" />
      </div>
      <div className="flex flex-col items-center gap-5">
        {(user.username === '')
          ? (
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Entrez votre username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="flex-grow px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-black"
              />
            </form>
          )
          : (
            <p style={{ color: 'white' }}>
              Bienvenue
              {' '}
              {user.username}
            </p>
          )}
        <Link to="/game/1">
          <button
            disabled={user.username === ''}
            type="button"
            onClick={handleStartGame}
            className="bg-green-500 px-20 py-2 rounded-md text-white "
          >
            Jouer: room 1
          </button>
        </Link>
        <Link to="/game/2">
          <button
            disabled={user.username === ''}
            type="button"
            onClick={handleStartGame}
            className="bg-green-500 px-20 py-2 rounded-md text-white "
          >
            Jouer: room 2
          </button>
        </Link>
        <button type="button" onClick={handleCreateGame} className="bg-blue-500  px-10 py-2 rounded-md text-white ">
          Créer une partie
        </button>
      </div>
    </div>
  );
}

export default Homepage;
