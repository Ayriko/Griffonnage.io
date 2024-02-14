import './App.css';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './config/Router.tsx';
import { GameProvider } from './contexts/GameContext.tsx';

function App(): React.JSX.Element {
  return (
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  );
}

export default App;
