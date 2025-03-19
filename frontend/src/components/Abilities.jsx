// Abilities.jsx
import React from "react";
import useStore from "../store";

const abilities = {
  // Warrior Abilities
  "Warrior": {
    "Berserk": () => ({ boost: { strength: 10, agility: 20 }, duration: 15, effect: "Enhance strength and Agility temporarily" }),
    "Shield Bash": () => ({ damage: 25, stun: 5, effect: "Stuns the enemy for five seconds" }),
    "Power Strike": () => ({ damage: 75, effect: "Deals 75 damage" }),
    "Defensive Stance": () => ({ boost: { strength: 10, constitution: 50 }, duration: 15, effect: "Enhance strength and Constitution temporarily" }),
    "Battle Cry": () => ({ boost: { strength: 20, staminaCost: 5 }, effect: "Enhance strength temporarily" }),
    "Whirlwind": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Downward Strike": () => ({ damage: 75, effect: "Deals 75 damage" }),
    "Bulwark": () => ({ boost: { strength: 10, constitution: 20 }, duration: 15, effect: "Enhance strength and Constitution temporarily" }),
    "Evasion": () => ({ boost: { dexterity: 25, agility: 25 }, duration: 15, effect: "Enhance dexterity and Agility temporarily" }),
    "Rampage": () => ({ damage: 100, effect: "Deals 100 damage" })
  },
  // Mage Abilities
  "Mage": {
    "Fireball": () => ({ damage: 50, manaCost: 5, effect: "Deals 50 damage" }),
    "Ice Bolt": () => ({ damage: 50, manaCost: 5, effect: "Deals 50 damage" }),
    "Lightning Strike": () => ({ damage: 50, manaCost: 2, effect: "Deals 50 damage" }),
    "Arcane Bolt": () => ({ damage: 50, manaCost: 2, effect: "Deals 50 damage" }),
    "Mana Burst": () => ({ damage: 50, manaCost: 2, effect: "Deals 50 damage" }),
    "Arcane Shield": () => ({ boost: { dexterity: 10, constitution: 20 }, duration: 15, effect: "Enhance dexterity and Constitution temporarily" }),
    "Meteor Strike": () => ({ damage: 100, manaCost: 25, effect: "Deals 100 damage" }),
    "Fire Wall": () => ({ boost: { manaCost: 10, damage: 50, stun: 5 }, duration: 15, effect: "Enhance and damage temporarily" }),
    "Mana Drain": () => ({ boost: { manaCost: 10, damage: 50, stun: 5 }, duration: 15, effect: "Enhance and damage temporarily" }),
    "Ice Storm": () => ({ manaCost: 5, damage: 50, stun: 20, duration: 15, effect: "Stun enemy and cause damage" })
  },
  // Rogue Abilities
  "Rogue": {
    "Backstab": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Shadow Strike": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Shadow Dance": () => ({ boost: { dexterity: 10, agility: 20 }, duration: 15, effect: "Enhance dexterity and Agility temporarily" }),
    "Shadow Step": () => ({ boost: { dexterity: 10, agility: 20 }, duration: 15, effect: "Enhance dexterity and Agility temporarily" }),
    "Shadow Blade": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Assassinate": () => ({ damage: 200, effect: "Deals 200 damage" }),
    "Stealth": () => ({ boost: { dexterity: 10, agility: 20 }, duration: 15, effect: "Enhance dexterity and Agility temporarily" }),
    "Fury Strike": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Evasion": () => ({ boost: { dexterity: 25, agility: 25 }, duration: 15, effect: "Enhance dexterity and Agility temporarily" }),
    "Acrobatics": () => ({ boost: { dexterity: 50, agility: 75 }, duration: 15, effect: "Enhance dexterity and Agility temporarily" })
  },
  // Paladin Abilities
  "Paladin": {
    "Holy Strike": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Divine Shield": () => ({ boost: { dexterity: 10, constitution: 20 }, duration: 15, effect: "Enhance dexterity and Constitution temporarily" }),
    "Judgment": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Holy Light": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Divine Protection": () => ({ boost: { dexterity: 10, constitution: 20 }, duration: 15, effect: "Enhance dexterity and Constitution temporarily" }),
    "Divine Blessing": () => ({ boost: { dexterity: 10, constitution: 20 }, duration: 15, effect: "Enhance dexterity and Constitution temporarily" }),
    "Holy Aura": () => ({ boost: { dexterity: 10, constitution: 20 }, duration: 15, effect: "Enhance dexterity and Constitution temporarily" }),
    "Divine Blade": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Blinding Light": () => ({ damage: 50, stun: 10, manaCost: 5, effect: "Deals 50 damage with stun" }),
    "Light Barrier": () => ({ boost: { dexterity: 10, constitution: 20 }, duration: 15, effect: "Enhance dexterity and Constitution temporarily" })
  },
  // Necromancer Abilities
  "Necromancer": {
    "Summon Undead": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Strengthen Undead": () => ({ damage: 100, effect: "Deals 100 damage" }),
    "Raise Dead": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Summon Skeleton": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Summon Zombie": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Summon Skeleton Archer": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Summon Skeleton Mage": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Summon Skeleton Warrior": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Melee Attack": () => ({ damage: 50, effect: "Deals 50 damage" }),
    "Ranged Attack": () => ({ damage: 50, effect: "Deals 50 damage" })
  },
  
};

const Abilities = ({ onUseAbility }) => {
  const character = useStore(state => state.character);
  const charClass = character?.class || "";
  
  // If an external onUseAbility prop is provided (from BattleScreen), use it;
  // otherwise, use our internal handler.
  const handleUse = (abilityName) => {
    if (onUseAbility) {
      onUseAbility(abilityName);
      return;
    }
    const abilityFunc = abilities[charClass]?.[abilityName];
    if (abilityFunc) {
      const effect = abilityFunc();
      useStore.setState(prevState => ({
        character: {
          ...prevState.character,
          stats: {
            ...prevState.character.stats,
            ...effect
          }
        }
      }));
      alert(`Used ${abilityName}: ${effect.effect}`);
    } else {
      alert("Ability not found");
    }
  };

  const classAbilities = abilities[charClass] || {};

  return (
    <div>
      <h2>Abilities</h2>
      <ul>
        {Object.keys(classAbilities).map((abilityName, idx) => (
          <li key={idx}>
            <button onClick={() => handleUse(abilityName)}>
              {abilityName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Abilities;
