// BattleScreen.jsx
import React, { useState } from "react";
import useStore from "../store";
import Abilities from "./Abilities";
// import {useItem} from "./items";
// import { gainExperience } from "./Levels";
import { Abilities as enemyAbilities, getRandomAbility } from "./enemyAbilities";



const BattleScreen = ({ onBattleEnd }) => {
    const character = useStore((state) => state.character);
    const [enemy, setEnemy] = useState({
        name: "Dungeon Creature",
        stats: { life: 100, mana: 100, stamina: 100, dexterity: 75, strength: 100, agility: 100 },
        abilities: Object.keys(enemyAbilities),
        level: 10,
        items: [
            { name: "Health Potion", effect: { life: 50 } },
            { name: "Mana Potion", effect: { mana: 50 } },
            { name: "Stamina Potion", effect: { stamina: 50 } }
        ]
    });
    const [enemyLife, setEnemyLife] = useState(enemy.stats.life);
    const [battleLog, setBattleLog] = useState([]);

    const handleUseAbility = (abilityName) => {
        const damage = Math.floor(Math.random() * 40) + 10;
        const newEnemyLife = enemyLife - damage;
        setEnemyLife(newEnemyLife);
        setBattleLog((prev) => [...prev, `Used ${abilityName}, dealing ${damage} damage.`]);

        if (newEnemyLife <= 0) {
            alert("You defeated the enemy!");
            onBattleEnd(true);
            return;
        }

        const enemyAbility = getRandomAbility(enemy);
        const enemyDamage = enemyAbility ? enemyAbilities[enemyAbility].damage : 0;

        useStore.setState((state) => ({
            character: {
                ...state.character,
                stats: {
                    ...state.character.stats,
                    life: Math.max(0, state.character.stats.life - enemyDamage)
                }
            }
        }));

        setBattleLog((prev) => [...prev, `Enemy used ${enemyAbility || "basic attack"}, dealing ${enemyDamage} damage.`]);

        if (character.stats.life - enemyDamage <= 0) {
            alert("You have been defeated!");
            onBattleEnd(false);
        }
    };

    return (
        <div className="battle-screen">
            <h2>Battle Mode</h2>
            <p>Enemy: {enemy.name} | Life: {enemyLife}</p>
            <Abilities onUseAbility={handleUseAbility} />
            <div className="battle-log">
                {battleLog.map((log, idx) => (
                    <p key={idx}>{log}</p>
                ))}
            </div>
        </div>
    );
};

export default BattleScreen;