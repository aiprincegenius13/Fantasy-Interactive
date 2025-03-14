import React, { useState } from "react";
import useStore from "../store";
import Abilities from "./Abilities";
import items from "./items"; // Import items correctly
import { abilities as enemyAbilities, getRandomSpecialAbility } from "./enemyAbilities";

const API_URL = "http://localhost:8081/api";

const BattleScreen = ({ onBattleEnd }) => {
  const character = useStore((state) => state.character);
  const [enemy, setEnemy] = useState({
    name: "Goblin",
    stats: { life: 80, strength: 15, agility: 10 },
    abilities: Object.keys(enemyAbilities),
  });
  const [enemyLife, setEnemyLife] = useState(enemy.stats.life);
  const [battleLog, setBattleLog] = useState([]);
  const [inventory, setInventory] = useState(items); // Track available items

  const handleUseAbility = (abilityName) => {
    const damage = Math.floor(Math.random() * 40) + 10;
    const newEnemyLife = enemyLife - damage;
    setEnemyLife(newEnemyLife);
    setBattleLog((prev) => [
      ...prev,
      `Used ${abilityName}, dealing ${damage} damage. Enemy life: ${newEnemyLife}`,
    ]);

    if (newEnemyLife <= 0) {
      alert("You defeated the enemy!");
      onBattleEnd(true);
      return;
    }

    const enemyAbility = getRandomSpecialAbility(enemy);
    const enemyDamage = enemyAbility ? enemyAbilities[enemyAbility].damage : 20;
    
    useStore.setState((state) => ({
      character: {
        ...state.character,
        stats: {
          ...state.character.stats,
          life: state.character.stats.life - enemyDamage,
        },
      },
    }));

    setBattleLog((prev) => [
      ...prev,
      `Enemy used ${enemyAbility || "basic attack"}, dealing ${enemyDamage} damage.`,
    ]);

    if (character.stats.life - enemyDamage <= 0) {
      alert("You have been defeated in battle!");
      onBattleEnd(false);
    }
  };

  const handleUseItem = (item) => {
    setBattleLog((prev) => [...prev, `Used ${item.name}: ${item.effect}`]);

    // Remove the item after use (if it's a consumable)
    setInventory((prev) => prev.filter((i) => i.name !== item.name));
  };

  return (
    <div className="battle-screen">
      <h2>Battle Mode</h2>
      <p>Enemy: {enemy.name} | Life: {enemyLife}</p>

      <Abilities onUseAbility={handleUseAbility} />

      {/* Display Items */}
      <div className="inventory">
        <h3>Inventory</h3>
        {inventory.length > 0 ? (
          inventory.map((item, idx) => (
            <button key={idx} onClick={() => handleUseItem(item)}>
              {item.name} ({item.effect})
            </button>
          ))
        ) : (
          <p>No items left</p>
        )}
      </div>

      {/* Battle Log */}
      <div className="battle-log">
        {battleLog.map((log, idx) => (
          <p key={idx}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default BattleScreen;
