import React from 'react';
import { useGameContext } from '../../contexts/GameContext.tsx';

function WordToGuess(): React.JSX.Element {
  const { Word } = useGameContext();
  const { length } = Word;

  const generateWord = () => {
    let word = '';
    for (let i = 0; i < length; i += 1) {
      word += '_ ';
    }
    word += length.toString();
    return word;
  };

  return (
    <h2 className="">
      {generateWord()}
    </h2>
  );
}

export default WordToGuess;
