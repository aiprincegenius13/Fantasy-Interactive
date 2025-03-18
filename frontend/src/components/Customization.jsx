// Customization.jsx
import React, { useState } from 'react';
import useStore from '../store';

const API_URL = import.meta.env.VITE_API_URL+"/api";

function Customization() {
  const [alignment, setAlignment] = useState('hero');
  const [charClass, setCharClass] = useState('Warrior');
  const [ability, setAbility] = useState('fireball');
  const [tendency, setTendency] = useState('Blocking');
  const setCharacter = useStore(state => state.setCharacter);
  const setScreen = useStore(state => state.setScreen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const baseStats = {
      "Warrior": { life: 150, mana: 50, stamina: 120, dexterity: 25, strength: 75, agility: 50 },
      "Mage": { life: 100, mana: 150, stamina: 80, dexterity: 25, strength: 20, agility: 20 },
      "Rogue": { life: 120, mana: 80, stamina: 100, dexterity: 175, strength: 50, agility: 100 },
      "Paladin": { life: 150, mana: 150, stamina: 100, dexterity: 50, strength: 75, agility: 70 },
      "Necromancer": { life: 80, mana: 200, stamina: 100, dexterity: 120, strength: 10, agility: 20 }
    };
    
    const characterStats = baseStats[charClass] || baseStats["Warrior"];
    
    const character = {
      alignment,
      class: charClass,
      stats: characterStats,
      specialAbility: ability,
      battleTendency: tendency
    };
    
    useStore.setState({
      character,
      currentScene: 0,
      experience: 0,
      level: 1,
      defeats: 0
    });

    try {
      const stateToSave = useStore.getState();
      const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: stateToSave.user, gameState: stateToSave })
      });
      if (!response.ok) {
        throw new Error("Failed to save game state");
      }
    } catch (error) {
      alert("Failed to save progress. Please check your connection.");
    }
    
    setScreen('story');
  };

  return (
    <div className="screen">
      <h2>Character Customization</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Choose your class:
          <select value={charClass} onChange={e => setCharClass(e.target.value)}>
            <option value="Warrior">Warrior</option>
            <option value="Mage">Mage</option>
            <option value="Rogue">Rogue</option>
            <option value="Paladin">Paladin</option>
            <option value="Necromancer">Necromancer</option>
          </select>
        </label>
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default Customization;
