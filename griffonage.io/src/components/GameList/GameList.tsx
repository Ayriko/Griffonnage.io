import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Games from '../../atoms/Games.tsx';

function GameList(): React.JSX.Element {
  const currentGames = useRecoilValue(Games);

  return (
    <ul className="grid grid-cols-1 gap-4">
      {currentGames.map((gameId) => (
        <li key={gameId}>
          <Link to={`/game/${gameId}`}>
            <button
              type="button"
              className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 transition duration-300"
            >
              Jouer : room
              {' '}
              {gameId}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GameList;
