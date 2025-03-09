import React from 'react';
import useStore from './store';
import Login from './components/Login';
import Customization from './components/Customization';
import Game from './components/Game';

function App() {
  const screen = useStore(state => state.screen);
  
  return (
    <div className="app-container">
      {screen === 'login' && <Login />}
      {screen === 'customization' && <Customization />}
      {screen === 'game' && <Game />}
    </div>
  );
}

export default App;

