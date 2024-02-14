import { createBrowserRouter } from 'react-router-dom';
import Game from '../pages/Game.tsx';
import Homepage from '../pages/Homepage.tsx';

const Router = createBrowserRouter([
  {
    path: '/',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <Homepage />,
  },
  {
    path: '/game',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <Game />,
  },
]);
export default Router;
