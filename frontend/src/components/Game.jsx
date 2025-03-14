// Game.jsx
import { generateEnemy, calculateExpGain, getRandomSpecialAbility } from './enemyAbilities';
import items from './items'; // Ensure proper case and default import

const startCombat = () => {
  const enemy = generateEnemy(character.level);

  const expEarned = calculateExpGain(character.level, enemy.level);
  addExperience(expEarned);

  if (experience + expEarned >= level * 200) {
    levelUp();
    alert(`Congratulations! You reached level ${level + 1}. Your stats have increased!`);
  }

  const abilityAwarded = getRandomSpecialAbility(enemy);
  if (abilityAwarded) {
    addAbility(abilityAwarded);
    alert(`You defeated ${enemy.name} (Lv.${enemy.level}) and earned ${expEarned} EXP! You also gained a new ability: ${abilityAwarded}`);
  }

  const droppedItem = items[Math.floor(Math.random() * items.length)];
  alert(`You found: ${droppedItem.name} - ${droppedItem.effect}`);
};
