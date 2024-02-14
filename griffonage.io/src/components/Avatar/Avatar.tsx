import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Avatar(): React.JSX.Element {
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [randomColor] = React.useState(generateRandomColor);

  return (
    <FontAwesomeIcon icon={faUser} size="lg" color={randomColor} />
  );
}

export default Avatar;
