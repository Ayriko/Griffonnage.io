import React, {useEffect, useState} from "react";
import {socket} from "../../socket.ts";
import Form from "./Form.tsx";
import {Events} from "./Events.tsx";

const Chat: React.FC = () => {
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    function onFooEvent(value: string[]) {
      setFooEvents(value);
    }

    socket.on('message to client', (message: string[]) => {
      onFooEvent(message)
    });

    socket.emit('firstConnection');

    socket.on('getMessageHistory', (messageHistory: string[]) => {
      onFooEvent(messageHistory)
    });
  }, []);


  return (
    <div>
      <Events events={ fooEvents } />
      <Form />
    </div>
  )
}

export default Chat;
