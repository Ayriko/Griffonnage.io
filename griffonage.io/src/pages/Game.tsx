import {Link} from "react-router-dom";
import WordProposition from "../components/WordProposition/WordProposition";
import WordToGuess from "../components/WordToGuess/WordToGuess";
import { useGameContext } from '../contexts/GameContext';
import Timer from "../components/Timer/Timer";
import Chat from "../components/chat/Chat.tsx";
import GameCanvas from "../components/convas/GameCanvas.tsx";

const Game = () => {

    const {Word,endGame} = useGameContext();

    return (
    <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-center text-5xl mt-12 mb-8">P'tite game</h1>
            <GameCanvas />
            <Chat />
        <Link to="/"><button type="button" className="m-10 p-2 border-4 border-black rounded-2xl" onClick={endGame}>Retour</button></Link>
        {
            (Word) ?
                <WordToGuess/>
            :
                <WordProposition/>
        }
        <Timer/>
    </div>
    );
};

export default Game;
