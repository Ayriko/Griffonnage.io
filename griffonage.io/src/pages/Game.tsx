import {Link} from "react-router-dom";

const Game = () => (
    <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-center text-5xl mt-12 mb-8">C'est le jeu</h1>
        <Link to="/">Retour</Link>
    </div>
);

export default Game;