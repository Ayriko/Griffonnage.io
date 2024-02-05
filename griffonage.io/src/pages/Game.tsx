import {Link} from "react-router-dom";
import GameCanvas from "../components/Convas/GameCanvas.tsx";

const Game = () => (
    <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-center text-5xl mt-12 mb-8">P'tite game</h1>
            <GameCanvas />
        <Link to="/"><button type="button" className="m-10 p-2 border-4 border-black rounded-2xl">Retour</button></Link>
    </div>
);

export default Game;