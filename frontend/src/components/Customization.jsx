// Customization.jsx
import React, { useState } from 'react';
import useStore from '../store';

const API_URL = "http://localhost:8081/api";

function Customization() {
  const [alignment, setAlignment] = useState('hero');
  const [charClass, setCharClass] = useState('Warrior');
  const [ability, setAbility] = useState('fireball');
  const [tendency, setTendency] = useState('Blocking');
  const setCharacter = useStore(state => state.setCharacter);
  const setScreen = useStore(state => state.setScreen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let baseStats;
    switch(charClass) {
      case "Warrior":
        baseStats = { life: 150, mana: 50, stamina: 120, dexterity: 25, strength: 75, agility: 50 };
        break;
      case "Mage":
        baseStats = { life: 100, mana: 150, stamina: 80, dexterity: 25, strength: 20, agility: 20 };
        break;
      case "Rogue":
        baseStats = { life: 120, mana: 80, stamina: 100, dexterity: 175, strength: 50, agility: 100 };
        break;
      case "Paladin":
        baseStats = { life: 150, mana: 150, stamina: 100, dexterity: 50, strength: 75, agility: 70 };
        break;
      case "Arcane Rogue":
        baseStats = { life: 120, mana: 100, stamina: 100, dexterity: 100, strength: 75, agility: 100 };
        break;
      case "Necromancer":
        baseStats = { life: 80, mana: 200, stamina: 100, dexterity: 120, strength: 10, agility: 20 };
        break;
      case "Wizard":
        baseStats = { life: 100, mana: 150, stamina: 80, dexterity: 12, strength: 25, agility: 20 };
        break;
      case "Shaman":
        baseStats = { life: 100, mana:300, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
        break;
      case "Warlock":
        baseStats = { life: 100, mana: 200, stamina: 100, dexterity: 25, strength: 25, agility: 25 };
        break;
      default:
        baseStats = { life: 100, mana: 10, stamina: 10, dexterity: 10, strength: 10, agility: 10 };
    }
    
    const character = {
      alignment,
      class: charClass,
      stats: baseStats,
      specialAbility: ability,
      battleTendency: tendency
    };

    // Reset defeat count and initialize experience/level.
    useStore.setState({
      character,
      currentScene: 0,
      experience: 0,
      level: 1,
      defeats: 0
    });

    // Save state to backend.
    try {
      const stateToSave = useStore.getState();
      await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: stateToSave.user, gameState: stateToSave })
      });
    } catch (error) {
      console.error("Save error:", error);
    }
    
    setScreen('story');
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
            <option value="Warrior">Warrior</option>
            <option value="Mage">Mage</option>
            <option value="Rogue">Rogue</option>
            <option value="Paladin">Paladin</option>
            <option value="Arcane Rogue">Arcane Rogue</option>
            <option value="Necromancer">Necromancer</option>
            <option value="Wizard">Wizard</option>
            <option value="Shaman">Shaman</option>
            <option value="Warlock">Warlock</option>
          </select>
        </label>
        <br />
        <label>
          Choose your special ability:
          <select value={ability} onChange={e => setAbility(e.target.value)}>
            <option value="fireball">Fireball</option>
            <option value="heal">Heal</option>
            <option value="stealth">Stealth</option>
            <option value="Brute Strength">Brute Strength</option>
            <option value="Levitation">Levitation</option>
            <option value="Telekinesis">Telekinesis</option>
            <option value="Ice Spear">Ice Spear</option>
            <option value="Ensare">Ensare</option>
            <option value="Dark Magic">Dark Magic</option>
          </select>
        </label>
        <br />
        <label>
          Choose your combat tendency:
          <select value={tendency} onChange={e => setTendency(e.target.value)}>
            <option value="Blocking">Blocking</option>
            <option value="Attacking">Attacking</option>
            <option value="Evading">Evading</option>
            <option value="Trap Avoidance">Trap Avoidance</option>
            <option value="Critical Damage">Critical Damage</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default Customization;
