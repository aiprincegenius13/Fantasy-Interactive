// App.jsx
import React from 'react';
import useStore from './store';
import Login from './components/Login';
import Customization from './components/Customization';
import StoryScreen from './components/StoryScreen';
import BattleScreen from './components/BattleScreen';
import './assets/styles/Login.css';
import './assets/styles/Customization.css';
import './assets/styles/StoryScreen.css';
import './assets/styles/BattleScreen.css';


const API_URL = import.meta.env.VITE_API_URL+"/api";

function App() {
  const screen = useStore(state => state.screen);
  const currentScene = useStore(state => state.currentScene);
  const setCurrentScene = useStore(state => state.setCurrentScene);
  const setScreen = useStore(state => state.setScreen);
  const user = useStore(state => state.user);
  const character = useStore(state => state.character);

  // Callback to handle story choices.
  const handleChoice = async (choice) => {
    if (choice.next === "combat") {
      setScreen("battle");
    } else if (choice.next === "exit") {
      setScreen("login");
    } else {
      // Update the current scene and optionally save game state.
      setCurrentScene(choice.next);
      try {
        await fetch(`${API_URL}/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user, gameState: useStore.getState() })
        });
      } catch (error) {
        console.error("Save error:", error);
      }
    }
  };

  // Callback for battle outcome.
  const handleBattleEnd = async (won) => {
    if (won) {
      alert("Victory! Returning to the story.");
      setScreen("story");
      // Optionally update the scene (here we return to scene 0)
      setCurrentScene(0);
    } else {
      useStore.getState().incrementDefeats();
      const defeats = useStore.getState().defeats;
      alert(`Defeat! Total defeats: ${defeats}`);
      if (defeats >= 3) {
        alert("You have lost all remaining lives. Please create a new character.");
        // Call backend deletion endpoint
        try {
          await fetch(`${API_URL}/delete/${user}`, { method: "DELETE" });
        } catch (error) {
          console.error("Deletion error:", error);
        }
        setScreen("customization");
      } else {
        setScreen("story");
      }
    }
  };

  return (
    <div className="app-container">
      {/* Display player stats on story and battle screens */}
      {(screen === 'story' || screen === 'battle') && character && user && (
        <div className="stats">
          <h3>Player Stats</h3>
          <p>
            Name: {user} | Alignment: {character.alignment} | Class: {character.class} <br />
            Life: {character.stats.life}, Mana: {character.stats.mana}, Stamina: {character.stats.stamina}, 
            Dexterity: {character.stats.dexterity}, Strength: {character.stats.strength}, Agility: {character.stats.agility} <br />
            Level: {useStore.getState().level} | EXP: {useStore.getState().experience}
          </p>
        </div>
      )}
      
      {screen === 'login' && <Login />}
      {screen === 'customization' && <Customization />}
      {screen === 'story' && <StoryScreen currentScene={currentScene} onChoice={handleChoice} />}
      {screen === 'battle' && <BattleScreen onBattleEnd={handleBattleEnd} />}
    </div>
  );
}

export default App;
