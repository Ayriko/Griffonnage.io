import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../socket.ts';
import { useGameContext } from '../../contexts/GameContext.tsx';
import {areWordsIdentical, isAlmostSimilar} from '../../helpers/genericHelper.ts';

function MessageForm(): React.JSX.Element {
  const [value, setValue] = useState('');
  const { user, Word } = useGameContext();
  const { roomId } = useParams();
  

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (areWordsIdentical(value, Word)) {
      socket.emit('message', ' à trouvé', user.username,roomId);
      socket.emit('userHasGuessed', roomId,  user.id);

    } else {
      socket.emit('message', value, user.username, roomId);
      if (isAlmostSimilar(value, Word)) {
        socket.emit('message', ' est pas loin', user.username,roomId);
      }
    }

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
