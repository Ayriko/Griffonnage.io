import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../socket.ts';
import MessageForm from './MessageForm.tsx';
import type { ChatMessage } from '../../types/ChatMessage.tsx';
import Chat from './Chat.tsx';

function ChatHistory(): React.JSX.Element {
  const [globalChatMessage, setGlobalChatMessage] = React.useState<ChatMessage[]>([]);
  const { roomId } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [globalChatMessage]);

  return (
    <div className="flex flex-col w-full rounded-md" style={{ height: '670px' }}>
      <div ref={chatContainerRef} className="flex-grow overflow-auto" style={{ overflowY: 'scroll' }}>
        <Chat globalChat={globalChatMessage} />
      </div>
      <div>
        <MessageForm />
      </div>
    </div>
  );
}

export default ChatHistory;
