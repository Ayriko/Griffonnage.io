import React, { useEffect } from 'react';
import { socket } from '../../socket.ts';
import MessageForm from './MessageForm.tsx';
import type { ChatMessage } from '../../types/ChatMessage.tsx';
import Chat from './Chat.tsx';

function ChatHistory(): React.JSX.Element {
  const [globalChatMessage, setGlobalChatMessage] = React.useState<ChatMessage[]>([]);

  useEffect(() => {
    function onFooEvent(value: ChatMessage[]) {
      setGlobalChatMessage(value);
    }

    socket.on('message to client', (message: ChatMessage[]) => {
      onFooEvent(message);
    });

    socket.emit('firstConnection');

    socket.on('getMessageHistory', (messageHistory: ChatMessage[]) => {
      onFooEvent(messageHistory);
    });
  }, []);

  return (
    <div className="flex flex-col-reverse w-full rounded-md ">
      <div className="mt-auto">
        <MessageForm />
      </div>
      <Chat globalChat={globalChatMessage} />
    </div>
  );
}

export default ChatHistory;
