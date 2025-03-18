import useStore from "../store";

// Experience required formula (increases exponentially)
const experienceRequired = (level) => Math.floor(100 * Math.pow(1.2, level - 1));

export const gainExperience = (exp) => {
  useStore.setState((state) => {
    let { experience, level, character } = state;
    
    experience += exp;
    let expToNextLevel = experienceRequired(level);
    
    // Level up if experience exceeds required threshold
    while (experience >= expToNextLevel) {
      experience -= expToNextLevel;
      level += 1;

      // Increase character stats upon leveling up
      character.stats.life += 10; 
      character.stats.mana += 5;
      character.stats.strength += 3;
      character.stats.agility += 2;
      character.stats.dexterity += 2;
      
      alert(`Level Up! You are now Level ${level}. Stats have increased.`);
      
      expToNextLevel = experienceRequired(level);
    }

    return { ...state, experience, level, character };
  });
};

export default gainExperience;