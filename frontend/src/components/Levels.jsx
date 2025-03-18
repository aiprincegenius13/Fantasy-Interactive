import React, { useState, useEffect } from 'react';
import useStore from '../store';
// import { calculateExpGain } from './specialAbilities';


const API_URL = import.meta.env.VITE_API_URL+"/api";

 const LevelSystem = () => {
  const character = useStore((state) => state.character);
  const experience = useStore((state) => state.experience);
  const level = useStore((state) => state.level);
  const setCharacter = useStore((state) => state.setCharacter);
  const setExperience = useStore((state) => state.setExperience);
  const setLevel = useStore((state) => state.setLevel);

  const levelUpThreshold = level * 200;

  const baseStats = {
    "Warrior": { life: 150, mana: 50, stamina: 120, dexterity: 25, strength: 75, agility: 50 },
    "Mage": { life: 100, mana: 150, stamina: 80, dexterity: 25, strength: 20, agility: 20 },
    "Rogue": { life: 120, mana: 80, stamina: 100, dexterity: 175, strength: 50, agility: 100 },
    "Paladin": { life: 150, mana: 150, stamina: 100, dexterity: 50, strength: 75, agility: 70 },
    "Arcane Rogue": { life: 120, mana: 100, stamina: 100, dexterity: 100, strength: 75, agility: 100 },
    "Necromancer": { life: 80, mana: 200, stamina: 100, dexterity: 120, strength: 10, agility: 20 },
    "Wizard": { life: 100, mana: 150, stamina: 80, dexterity: 12, strength: 25, agility: 20 },
    "Shaman": { life: 100, mana: 300, stamina: 100, dexterity: 10, strength: 10, agility: 10 },
    "Warlock": { life: 100, mana: 200, stamina: 100, dexterity: 25, strength: 25, agility: 25 }
  };

  const levelUp = () => {
    if (experience >= levelUpThreshold) {
      const newLevel = level + 1;
      const statBoost = baseStats[character.class];
      
      const updatedStats = {
        ...character.stats,
        life: character.stats.life + Math.floor(statBoost.life * 0.1),
        mana: character.stats.mana + Math.floor(statBoost.mana * 0.1),
        stamina: character.stats.stamina + Math.floor(statBoost.stamina * 0.1),
        dexterity: character.stats.dexterity + Math.floor(statBoost.dexterity * 0.05),
        strength: character.stats.strength + Math.floor(statBoost.strength * 0.05),
        agility: character.stats.agility + Math.floor(statBoost.agility * 0.05),
      };
      
      setCharacter({ ...character, stats: updatedStats });
      setLevel(newLevel);
      setExperience(0);
      alert(`Level Up! You are now Level ${newLevel}. Your stats have increased!`);
    }
  };

  useEffect(() => {
    levelUp();
  }, [experience]);

  return (
    <div className="level-system">
      <h2>Level System</h2>
      <p>Character Level: {level}</p>
      <p>Experience: {experience} / {levelUpThreshold}</p>
    </div>
  );
};

export default LevelSystem;
