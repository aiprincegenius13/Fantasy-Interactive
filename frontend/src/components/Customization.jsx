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
      case "Warrior":
        baseStats = { life: 150, mana: 50, stamina: 120, dexterity: 10, strength: 20, agility: 10 };
        break;
      case "Mage":
        baseStats = { life: 100, mana: 150, stamina: 80, dexterity: 12, strength: 8, agility: 14 };
        break;
      case "Rogue":
        baseStats = { life: 120, mana: 80, stamina: 100, dexterity: 18, strength: 12, agility: 20 };
        break;
        case "Paladin":
          baseStats = { life: 150, mana: 80, stamina: 100, dexterity: 50, strength: 25, agility: 20 };
          break;
          case "Arcane Rogue":
            baseStats = { life: 120, mana: 100, stamina: 100, dexterity: 100, strength: 15, agility: 50 };
            break;
            case "Necromancer":
              baseStats = { life: 80, mana: 200, stamina: 100, dexterity: 120, strength: 10, agility: 20 };
              break;
              case "Druid":
                baseStats = { life: 120, mana: 125, stamina: 50, dexterity: 10, strength: 10, agility: 10 };
                break;
                case "Bard":
                  baseStats = { life: 100, mana: 150, stamina: 100, dexterity: 20, strength: 15, agility: 15 };
                  break;
                  case "Monk":
                    baseStats = { life: 100, mana: 20, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
                    break;
                    case "Shaman":
                      baseStats = { life: 100, mana: 100, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
                      break;
                      case "Warlock":
                        baseStats = { life: 100, mana: 100, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
                        break;
                        case "Cleric":
                          baseStats = { life: 100, mana: 100, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
                          break;
                            case "Ranger":
                              baseStats = { life: 100, mana: 100, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
                              break;
                             case "Shapeshifter":
                              baseStats = { life: 100, mana: 100, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
                              break;
                              case "Beastmaster":
                                baseStats = { life: 100, mana: 100, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
                                break;
                                case "Berserker":
                                  baseStats = { life: 100, mana: 100, stamina: 100, dexterity: 10, strength: 10, agility: 10 };
                                  break;
      
            
      default:
        baseStats = { life: 100, mana: 10, stamina: 10, dexterity: 10, strength: 10, agility: 10 };
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
