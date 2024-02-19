import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../Avatar/Avatar.tsx';
import { socket } from '../../socket.ts';
import type { User } from '../../types/User.tsx';

function Player(): React.JSX.Element {
  const [players, setPlayers] = React.useState<User[]>([]);

  const { roomId } = useParams();

  useEffect(() => {
    socket.emit('getPlayersByRoomId', roomId);
    socket.on('playerList', (playersData: User[]) => {
      setPlayers(playersData);
    });

    return () => {
      socket.off('playerList');
    };
  }, [roomId]);

  return (
    <div className="flex flex-col w-full">

      {players.map((player, index) => (
        <div>
          <div key={player} className="flex flex-row justify-between">
            <p>
              {' '}
              #
              {index + 1}
            </p>
            <p>{player.username}</p>
            <Avatar />

          </div>
          <div className="text-center text-sm text-gray-500">
            {player.score}
            {' '}
            points
          </div>
        </div>
      ))}
    </div>
  );
}

export default Player;
