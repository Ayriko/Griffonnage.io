import React from 'react';
import {getRandom} from '../../helpers/genericHelper';
import wordListData from '../../wordList/wordList';
import { useGameContext } from '../../contexts/GameContext';

const WordProposition: React.FC = () => {

  const {startGame} = useGameContext();


    return (
        <div className="flex justify-center items-center flex-col"
        style={{
            width: '1000px',
            height: '650px',
            backgroundColor: 'rgba(0, 0, 0, 0.75)', 
            borderRadius: '10px',
          }}
          >
            <p> Choissisez un mot</p>
            <div className="flex justify-center items-center flex-row ">
            {
                getRandom(wordListData, 3).map((value, index) => (
                    <button key={index} onClick={() => startGame(value)}  style={{
                
                        minWidth: '150px',
                        height: '30px',
                        backgroundColor: 'rgb(255, 255, 255)', 
                        borderRadius: '10px',
                        margin: '10px',
                      }}>
                        {value}
                    </button>
                ))
            }
            </div>
        </div>
    );
};

export default WordProposition;



