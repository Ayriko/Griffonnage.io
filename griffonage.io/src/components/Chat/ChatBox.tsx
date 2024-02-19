import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../socket.ts';
import MessageForm from './MessageForm.tsx';
import type { ChatMessage } from '../../types/ChatMessage.tsx';
import Chat from './Chat.tsx';

function ChatHistory(): React.JSX.Element {
  const [globalChatMessage, setGlobalChatMessage] = React.useState<ChatMessage[]>([]);
  const { roomId } = useParams();

  useEffect(() => {
    function onGlobaChatMessageEvent(value: ChatMessage[]) {
      setGlobalChatMessage(value);
    }

    socket.on('message to client', (message: ChatMessage[]) => {
      onGlobaChatMessageEvent(message);
    });

    socket.emit('firstConnection', roomId);

    socket.on('getMessageHistory', (messageHistory: ChatMessage[]) => {
      onGlobaChatMessageEvent(messageHistory);
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
