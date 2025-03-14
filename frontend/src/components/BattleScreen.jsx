// BattleScreen.jsx
import React, { useState } from "react";
import useStore from "../store";
import Abilities from "./Abilities";

const API_URL = "http://localhost:8081/api";

// For demonstration, we define a sample enemy.
const sampleEnemy = {
  name: "Dungeon Troll",
  stats: { life: 100, mana: 0, stamina: 80, dexterity: 40, strength: 100, agility: 10 },
  specialAbilities: ["damage * 2", "Hard Body", "Dismemberment"],
  enemyAbilities: ["Weapon Strike", "Stomp", "Crush"],
  items: ["Health Potion", "Mana Potion", "Stamina Potion"],
  gold: 50
  
};

const BattleScreen = ({ onBattleEnd }) => {
  const [enemyLife, setEnemyLife] = useState(sampleEnemy.stats.life);
  const [battleLog, setBattleLog] = useState([]);
  const character = useStore(state => state.character);

  const handleUseAbility = (abilityName) => {
    // Simulate player attack: random damage between 10 and 50.
    const damage = Math.floor(Math.random() * 40) + 10;
    const newEnemyLife = enemyLife - damage;
    setEnemyLife(newEnemyLife);
    setBattleLog(prev => [...prev, `Used ${abilityName} dealing ${damage} damage. Enemy life: ${newEnemyLife}`]);

    if (newEnemyLife <= 0) {
      alert("You defeated the enemy!");
      onBattleEnd(true);
      return;
    }

    // Simulate enemy counterattack.
    const enemyDamage = 20;
    // Update player's life.
    useStore.setState(state => ({
      character: {
        ...state.character,
        stats: {
          ...state.character.stats,
          life: state.character.stats.life - enemyDamage
        }
      }
    }));
    setBattleLog(prev => [...prev, `Enemy counterattacks dealing ${enemyDamage} damage.`]);

    if (character.stats.life - enemyDamage <= 0) {
      alert("You have been defeated in battle!");
      onBattleEnd(false);
    }
  };

  return (
    <div className="battle-screen">
      <h2>Battle Mode</h2>
      <p>
        Enemy: {sampleEnemy.name} | Life: {enemyLife}
      </p>
      <Abilities onUseAbility={handleUseAbility} />
      <div className="battle-log">
        {battleLog.map((log, idx) => (
          <p key={idx}>{log}</p>
        ))}
      </div>
      {/* Fallback buttons for simulation */}
      <button onClick={() => onBattleEnd(true)}>Simulate Win</button>
      <button onClick={() => onBattleEnd(false)}>Simulate Loss</button>
    </div>
  );
};

export default BattleScreen;
