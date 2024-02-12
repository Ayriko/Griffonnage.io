import React, {useState} from "react";
import {socket} from "../../socket.ts";

const Form: React.FC = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    socket.emit('message', value, () => {
      console.log('emit message')
      setValue('')
      setIsLoading(false);
    });

    setValue('')
    setIsLoading(false);
  }

  return (
    <form onSubmit={ onSubmit }>
      <input 
      type={"text"} 
      value={value} 
      onChange={ e => setValue(e.target.value) } 
      placeholder="Tape ta supposition ici"
      className="border border-green-500 rounded w-full py-1"
      />
   
    </form>
  );
};
 export default Form
