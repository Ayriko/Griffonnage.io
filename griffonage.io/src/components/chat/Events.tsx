import React from "react";
import { useGameContext } from "../../contexts/GameContext";

interface Props {
  events: string[]
}

export const Events: React.FC<Props> = ({events}) => {

  const {username} = useGameContext();
  return (
    <ul >
      {
        events.map((event, index) =>
          <li key={ index } className={index % 2 === 0 ? 'bg-gray-200 px-1' : 'px-1' }>{username} : { event }</li>
        )
      }
    </ul>
  );
};
