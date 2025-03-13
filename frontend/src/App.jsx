// App.jsx :contentReference[oaicite:0]{index=0}
import React from 'react';
import useStore from './store';
import Login from './components/Login';
import Customization from './components/Customization';
import StoryScreen from './components/StoryScreen';
import BattleScreen from './components/BattleScreen';

function App() {
  const screen = useStore(state => state.screen);
  const character = useStore(state => state.character);
  const user = useStore(state => state.user);
  
  return (
    <div className="app-container">
      {/* Display player stats on game screens */}
      {(screen === 'story' || screen === 'battle') && character && user && (
        <div className="stats">
          <h3>Player Stats</h3>
          <p>
            Name: {user} | Alignment: {character.alignment} | Class: {character.class} <br />
            Life: {character.stats.life}, Mana: {character.stats.mana}, Stamina: {character.stats.stamina}, 
            Dexterity: {character.stats.dexterity}, Strength: {character.stats.strength}, Agility: {character.stats.agility} <br />
            Level: {character.level || 1} | EXP: {character.exp || 0}
          </p>
        </div>
      )}
      
      {/* Render appropriate screen based on store's "screen" state */}
      {screen === 'login' && <Login />}
      {screen === 'customization' && <Customization />}
      {screen === 'story' && <StoryScreen />}
      {screen === 'battle' && <BattleScreen />}
    </div>
  );
}

export default App;
