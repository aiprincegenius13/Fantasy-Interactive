import useStore from '../store';

const baseStats = {
  "Warrior": { life: 150, mana: 50, stamina: 120, dexterity: 25, strength: 75, agility: 50 },
  "Mage": { life: 100, mana: 150, stamina: 80, dexterity: 25, strength: 20, agility: 20 },
  "Rogue": { life: 120, mana: 80, stamina: 100, dexterity: 175, strength: 50, agility: 100 },
  "Paladin": { life: 150, mana: 150, stamina: 100, dexterity: 50, strength: 75, agility: 70 },
  "Necromancer": { life: 80, mana: 200, stamina: 100, dexterity: 120, strength: 10, agility: 20 }
};

export const gainExperience = (exp) => {
  useStore.setState((state) => {
    const newExp = state.experience + exp;
    const threshold = state.level * 200;
    let newLevel = state.level;
    let updatedStats = { ...state.character.stats };

    // Level-up loop in case player gains multiple levels at once
    while (newExp >= threshold) {
      newLevel += 1;
      Object.keys(updatedStats).forEach(stat => {
        updatedStats[stat] += Math.floor(baseStats[state.character.class][stat] * 0.1);
      });
      alert(`🎉 Level Up! You reached Level ${newLevel}`);
    }

    return {
      experience: newExp % threshold,
      level: newLevel,
      character: { ...state.character, stats: updatedStats }
    };
  });
};


