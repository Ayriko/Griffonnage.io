import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../socket.ts';
import { useGameContext } from '../../contexts/GameContext.tsx';

function MessageForm(): React.JSX.Element {
  const [value, setValue] = useState('');
  const { user } = useGameContext();
  const { roomId } = useParams();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    socket.emit('message', value, user.username, roomId);

    setValue('');
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tape ta supposition ici"
        className="border border-green-500 rounded w-full py-1"
      />

    </form>
  );
}

export default MessageForm;
