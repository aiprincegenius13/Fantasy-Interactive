// Import the new modules at the top of Game.jsx
import { generateEnemy, calculateExpGain, getRandomSpecialAbility } from '../enemyAbilities';
import items from '../items';

// Inside the Game component:

const startCombat = () => {
  // Generate a random enemy based on the player's level
  const enemy = generateEnemy(character.level);
  
  // For simplicity, assume the player wins the battle.
  // (You could later expand this to a more detailed combat simulation.)
  const playerStrength = character.stats.strength;
  const enemyStrength = enemy.stats.strength;
  
  // Calculate experience gain using the new formula
  const expEarned = calculateExpGain(character.level, enemy.level);
  addExperience(expEarned);
  
  // Check if the new EXP meets the level up threshold (threshold: level * 200)
  if (experience + expEarned >= level * 200) {
    levelUp();
    alert(`Congratulations! You reached level ${level + 1}. Your stats have increased!`);
  }
  
  // Award one random special ability from the defeated enemy
  const abilityAwarded = getRandomSpecialAbility(enemy);
  if (abilityAwarded) {
    addAbility(abilityAwarded);
    alert(`You defeated ${enemy.name} (Lv.${enemy.level}) and earned ${expEarned} EXP! You also gained a new special ability: ${abilityAwarded}`);
  } else {
    alert(`You defeated ${enemy.name} (Lv.${enemy.level}) and earned ${expEarned} EXP!`);
  }
  
  // Drop a random item from the items list
  const droppedItem = items[Math.floor(Math.random() * items.length)];
  alert(`You found a dropped item: ${droppedItem.name} - ${droppedItem.effect}`);
};
