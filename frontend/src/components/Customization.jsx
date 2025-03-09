import React, { useState } from 'react';
import useStore from '../store';

const API_URL = "http://localhost:8081/api";

function Customization() {
  const [alignment, setAlignment] = useState('hero');
  const [charClass, setCharClass] = useState('warrior');
  const [ability, setAbility] = useState('fireball');
  const setCharacter = useStore(state => state.setCharacter);
  const setScreen = useStore(state => state.setScreen);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    let baseStats;
    switch(charClass) {
      case "warrior":
        baseStats = { life: 150, mana: 50, stamina: 120, dexterity: 10, strength: 20, agility: 10 };
        break;
      case "mage":
        baseStats = { life: 100, mana: 150, stamina: 80, dexterity: 12, strength: 8, agility: 14 };
        break;
      case "rogue":
        baseStats = { life: 120, mana: 80, stamina: 100, dexterity: 18, strength: 12, agility: 20 };
        break;
      default:
        baseStats = { life: 100, mana: 100, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
    }
    
    const character = {
      alignment,
      class: charClass,
      stats: baseStats,
      specialAbility: ability
    };

    // Initialize game state values if needed
    useStore.setState({
      character,
      currentScene: 0,
      experience: 0,
      level: 1,
      specialAbilities: [ability]
    });

    // Save the new game state to backend
    const stateToSave = useStore.getState();
    await fetch(`${API_URL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: stateToSave.user, gameState: stateToSave })
    });
    
    setScreen('game');
  };

  return (
    <div className="screen">
      <h2>Character Customization</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Choose your path:
          <select value={alignment} onChange={e => setAlignment(e.target.value)}>
            <option value="hero">Hero</option>
            <option value="villain">Villain</option>
          </select>
        </label>
        <br />
        <label>
          Choose your class:
          <select value={charClass} onChange={e => setCharClass(e.target.value)}>
            <option value="warrior">Warrior</option>
            <option value="mage">Mage</option>
            <option value="rogue">Rogue</option>
          </select>
        </label>
        <br />
        <label>
          Choose your special ability:
          <select value={ability} onChange={e => setAbility(e.target.value)}>
            <option value="fireball">Fireball</option>
            <option value="heal">Heal</option>
            <option value="stealth">Stealth</option>
            <option value="berserk">Berserk</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default Customization;
