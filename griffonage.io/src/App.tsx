import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./config/Router.tsx";
import {GameProvider} from "./contexts/GameContext.tsx";

const App = () => (
    <GameProvider>
        <RouterProvider router={router}/>
    </GameProvider>
);

export default App;