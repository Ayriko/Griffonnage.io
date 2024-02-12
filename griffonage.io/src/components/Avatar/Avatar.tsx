import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


const Avatar = () => {


    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const [randomColor, setRandomColor] = useState(generateRandomColor);

    return (
        <FontAwesomeIcon icon={faUser} size="lg" color={randomColor} />
    );
};

export default Avatar;