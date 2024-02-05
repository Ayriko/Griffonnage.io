import React from 'react';
import { useGameContext } from '../../contexts/GameContext';


const WordToGuess: React.FC = () => {

    const {Word} = useGameContext();
    const length = Word.length;

    const generateWord = (length: number) => {
        let word = '';
        for (let i = 0; i < length; i++) {
            word += '_ ';
        }
        word += length.toString();
        return word;
    }

  return (
    <div className="flex justify-center items-center flex-col">
        <h2>
            {generateWord(length)}
        </h2>
        <h2>{Word}</h2>
    </div>
  );
};

export default WordToGuess;