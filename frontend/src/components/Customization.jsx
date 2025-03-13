// Customization.jsx :contentReference[oaicite:2]{index=2}
import React, { useState } from 'react';
import useStore from '../store';

const API_URL = "http://localhost:8081/api";

function Customization() {
  const [alignment, setAlignment] = useState('hero');
  const [charClass, setCharClass] = useState('warrior');
  const [ability, setAbility] = useState('fireball');
  const [tendency, setTendency] = useState('Blocking');

  const setCharacter = useStore(state => state.setCharacter);
  const setScreen = useStore(state => state.setScreen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let baseStats;
    switch(charClass) {
      case "Warrior":
        baseStats = { life: 150, mana: 50, stamina: 120, dexterity: 10, strength: 20, agility: 10 };
        break;
      case "Mage":
        baseStats = { life: 100, mana: 150, stamina: 80, dexterity: 12, strength: 8, agility: 14 };
        break;
      case "Rogue":
        baseStats = { life: 120, mana: 80, stamina: 100, dexterity: 18, strength: 12, agility: 20 };
        break;
      // …other classes as needed
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

    // Reset additional state values (including defeats)
    useStore.setState({
      character,
      currentScene: 0,
      experience: 0,
      level: 1,
      defeats: 0,
      specialAbilities: [ability]
    });

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
            <option value="druid">Druid</option>
            <option value="arcane rogue">Arcane Rogue</option>
            <option value="paladin">Paladin</option>
            <option value="berserker">Berserker</option>
            <option value="archer">Archer</option>
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
