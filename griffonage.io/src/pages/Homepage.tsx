import {type SetStateAction } from "react";
import {Link} from "react-router-dom";
import Title from "../components/Title/Title";
import { useGameContext } from "../contexts/GameContext";

const Homepage = () => {

  const {setUsername, setPlayers} = useGameContext();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
};

    const handleStartGame = () => {
        
    }

    const handleCreateGame = () => {
        
    }

    return (
    <div className="min-h-screen flex flex-col ">
        <div className="mt-40 mb-20 ">
        <Title size="text-9xl" />
        </div>
        <div className="flex flex-col items-center gap-5">
        <input
          type="text"
          placeholder="Entrez votre username"
          onChange={handleUsername}
          className="flex-grow px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder-black "
        />
        <Link to="/game"><button onClick={handleStartGame} className="bg-green-500 px-20 py-2 rounded-md text-white ">Jouer</button></Link>
        <button onClick={handleCreateGame} className="bg-blue-500  px-10 py-2 rounded-md text-white ">Créer une partie</button>
        </div>
    </div>
    );
};

export default Homepage;
