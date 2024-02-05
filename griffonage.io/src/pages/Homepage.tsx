import {Link} from "react-router-dom";

const Homepage = () => (
    <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-center text-5xl mt-12 mb-8">Griffonnage.io</h1>
        <Link to="/game">Jouer</Link>
    </div>
);

export default Homepage;
