import React from 'react';
import { getRandom } from '../../helpers/genericHelper.ts';
import wordListData from '../../wordList/wordList.ts';
import { useGameContext } from '../../contexts/GameContext.tsx';

function WordProposition(): React.JSX.Element {
  const { startGame } = useGameContext();

  return (
    <div
      className="flex justify-center items-center flex-col"
      style={{
        width: '1000px',
        height: '650px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: '10px',
      }}
    >
      <p> Choisissez un mot</p>
      <div className="flex justify-center items-center flex-row ">
        {
          getRandom(wordListData, 3).map((value: string) => (
            <button
              type="button"
              key={value}
              onClick={() => startGame(value)}
              style={{

                minWidth: '150px',
                height: '30px',
                backgroundColor: 'rgb(255, 255, 255)',
                borderRadius: '10px',
                margin: '10px',
              }}
            >
              {value}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default WordProposition;
