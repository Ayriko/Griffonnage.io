import { createBrowserRouter } from "react-router-dom";
import Game from "../pages/Game.tsx";
import Homepage from "../pages/Homepage.tsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "/game",
        element: <Game />
    }
]);
export default Router;
