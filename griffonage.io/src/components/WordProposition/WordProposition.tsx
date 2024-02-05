import React from 'react';
import {getRandom} from '../../helpers/genericHelper';
import wordListData from '../../wordList/wordList';
import { useGameContext } from '../../contexts/GameContext';

const WordProposition: React.FC = () => {

  const {startGame} = useGameContext();


    return (
        <div className="flex justify-center items-center flex-col">
            <p> Choissisez un mot</p>
            {
                getRandom(wordListData, 3).map((value, index) => (
                    <button key={index} onClick={() => startGame(value)}>
                        {value}
                    </button>
                ))
            }
        </div>
    );
};

export default WordProposition;



