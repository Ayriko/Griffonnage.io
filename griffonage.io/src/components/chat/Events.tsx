import React from "react";

interface Props {
  events: string[]
}

export const Events: React.FC<Props> = ({events}) => {
  return (
    <ul>
      {
        events.map((event, index) =>
          <li key={ index }>{ event }</li>
        )
      }
    </ul>
  );
};
