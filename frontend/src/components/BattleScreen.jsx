// BattleScreen.jsx
import React, { useState } from "react";
import useStore from "../store";
import Abilities from "./Abilities";

const API_URL = "http://localhost:8081/api";

const BattleScreen = ({ enemy, onBattleEnd }) => {
  const [enemyLife, setEnemyLife] = useState(enemy.stats.life);
  const [battleLog, setBattleLog] = useState([]);
  const character = useStore(state => state.character);

  // Callback when an ability is used in battle
  const handleUseAbility = (abilityName) => {
    // For demonstration, we simulate damage as a random value between 10 and 50.
    const damage = Math.floor(Math.random() * 40) + 10;
    const newEnemyLife = enemyLife - damage;
    setEnemyLife(newEnemyLife);
    setBattleLog(prev => [...prev, `Used ${abilityName} dealing ${damage} damage. Enemy life: ${newEnemyLife}`]);

    // Check for victory
    if (newEnemyLife <= 0) {
      alert("You defeated the enemy!");
      onBattleEnd(true);
      return;
    }

    // Simulate enemy counterattack (fixed damage for simplicity)
    const playerDamage = 20;
    // Update player's life in global state
    useStore.setState(state => ({
      character: {
        ...state.character,
        stats: {
          ...state.character.stats,
          life: state.character.stats.life - playerDamage
        }
      }
    }));
    setBattleLog(prev => [...prev, `Enemy counterattacks dealing ${playerDamage} damage.`]);

    // Check if the player's life drops to zero (or below)
    if (character.stats.life - playerDamage <= 0) {
      alert("You have been defeated in battle!");
      onBattleEnd(false);
    }
  };

  return (
    <div className="battle-screen">
      <h2>Battle Mode</h2>
      <p>
        Enemy: {enemy.name} | Life: {enemyLife}
      </p>
      <Abilities onUseAbility={handleUseAbility} />
      <div className="battle-log">
        {battleLog.map((log, idx) => (
          <p key={idx}>{log}</p>
        ))}
      </div>
      {/* Fallback buttons to simulate outcome directly */}
      <button onClick={() => onBattleEnd(true)}>Simulate Win</button>
      <button onClick={() => onBattleEnd(false)}>Simulate Loss</button>
    </div>
  );
};

export default BattleScreen;
