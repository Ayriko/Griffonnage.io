import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./config/Router.tsx";

const App = () => (
    <div>
        <RouterProvider router={router}/>
    </div>
);

export default App;