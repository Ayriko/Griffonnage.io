import './App.css';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { RecoilRoot } from 'recoil';
import router from './config/Router.tsx';
import { GameProvider } from './contexts/GameContext.tsx';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </RecoilRoot>
  );
}

export default App;
