// Abilities.jsx :contentReference[oaicite:0]{index=0}
import React from "react";
import useStore from "../store";

// Define a simplified abilities list per class (you can expand this as needed)
const abilitiesByClass = {
  Warrior: {
    Berserk: { damage: 0, boost: { strength: 10, agility: 20 }, duration: 15, effect: "Enhance strength and Agility temporarily" },
    "Shield Bash": { damage: 25, stun: 5, effect: "Stuns the enemy for five seconds" },
    "Power Strike": { damage: 75, effect: "Powerful melee attack dealing 75 damage" },
  },
  Mage: {
    Fireball: { damage: 50, manaCost: 5, effect: "Deals 50 damage" },
    "Ice Bolt": { damage: 50, manaCost: 5, effect: "Deals 50 damage" },
    "Lightning Strike": { damage: 50, manaCost: 2, effect: "Deals 50 damage" },
  },
  Rogue: {
    Backstab: { damage: 50, effect: "Deals 50 damage" },
    "Shadow Strike": { damage: 50, effect: "Deals 50 damage" },
    "Shadow Dance": { boost: { dexterity: 10, agility: 20 }, duration: 15, effect: "Enhance dexterity and agility temporarily" },
  },
  // …add other classes as needed
};

const Abilities = ({ onUseAbility }) => {
  const character = useStore(state => state.character);
  const characterClass = character?.class || "";
  const abilities = abilitiesByClass[characterClass] || {};

  return (
    <div>
      <h2>Abilities</h2>
      <ul>
        {Object.keys(abilities).map((abilityName, idx) => (
          <li key={idx}>
            <button onClick={() => onUseAbility(abilityName)}>{abilityName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Abilities;
