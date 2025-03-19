import { useEffect } from 'react';
import useStore from '../store';

const baseStats = {
  "Warrior": { life: 150, mana: 50, stamina: 120, dexterity: 25, strength: 75, agility: 50 },
  "Mage": { life: 100, mana: 150, stamina: 80, dexterity: 25, strength: 20, agility: 20 },
  "Rogue": { life: 120, mana: 80, stamina: 100, dexterity: 175, strength: 50, agility: 100 },
  "Paladin": { life: 150, mana: 150, stamina: 100, dexterity: 50, strength: 75, agility: 70 },
  "Necromancer": { life: 80, mana: 200, stamina: 100, dexterity: 120, strength: 10, agility: 20 }

};

export const gainExperience = (exp) => {
  useStore.setState((state) => ({ experience: state.experience + exp }));
};

export const LevelSystem = () => {
  const character = useStore(state => state.character);
  const experience = useStore(state => state.experience);
  const level = useStore(state => state.level);
  const setCharacter = useStore(state => state.setCharacter);
  const setLevel = useStore(state => state.setLevel);
  const setExperience = useStore(state => state.setExperience);

  useEffect(() => {
    const levelUpThreshold = level * 200;

    if (experience >= levelUpThreshold) {
      const updatedStats = Object.keys(character.stats).reduce((acc, stat) => {
        acc[stat] = character.stats[stat] + Math.floor(baseStats[character.class][stat] * 0.1);
        return acc;
      }, {});

      setCharacter({ ...character, stats: updatedStats });
      setLevel(level + 1);
      setExperience(experience - levelUpThreshold);
      alert(`Level Up! You reached Level ${level + 1}`);
    }
  }, [experience]);

  return null; 
};

