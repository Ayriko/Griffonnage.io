import React from 'react';
import Avatar from '../Avatar/Avatar.tsx';
import { useGameContext } from '../../contexts/GameContext.tsx';

function Player(): React.JSX.Element {
  const { user } = useGameContext();
  const classement = 1;
  const points = 25;
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between">
        <p>
          {' '}
          #
          {classement}
        </p>
        <p>{user.username}</p>
        <Avatar />
      </div>
      <div className="text-center text-sm text-gray-500">
        {points}
        {' '}
        points
      </div>

    </div>
  );
}

export default Player;
