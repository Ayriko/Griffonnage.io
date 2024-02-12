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
    <div className="flex flex-col-reverse w-full rounded-md ">
      <div className="mt-auto">
        <Form />
      </div>
      <Events events={ fooEvents } />
    </div>
  )
}

export default Chat;
