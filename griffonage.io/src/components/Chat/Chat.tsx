import React from 'react';
import type { ChatMessage } from '../../types/ChatMessage.tsx';

interface Props {
  globalChat: ChatMessage[]
}

function Chat({ globalChat }: Props): React.JSX.Element {
  return (
    <ul>
      {
        globalChat.map((chat, index) => (
          (chat.message === ' à trouvé') ?
            <li key={`${chat.message}${chat.user}`} className={'text-green-500 bg-green-500 bg-opacity-10 px-1'}> 
              {chat.user}
              {' '}
              {chat.message}
            </li>
          : (chat.message === ' est pas loin') ?
            <li key={`${chat.message}${chat.user}`} className={'text-yellow-500  bg-yellow-500 bg-opacity-10 px-1'}>
              {chat.user}
              {' '}
              {chat.message}
            </li>
            :
          <li key={`${chat.message}${chat.user}`} className={index % 2 === 0 ? 'bg-gray-200 px-1' : 'px-1'}>
            {chat.user}
            {' '}
            :
            {' '}
            {chat.message}
          </li>
        ))
      }
    </ul>
  );
}

export default Chat;
