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
        <h2 className=''>
            {generateWord(length)}
        </h2>
  );
};

export default WordToGuess;