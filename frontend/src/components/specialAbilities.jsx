export function getRandomSpecialAbility(enemy) {
    if (!enemy.specialAbilities || enemy.specialAbilities.length === 0) return null;
    const index = Math.floor(Math.random() * enemy.specialAbilities.length);
    return enemy.specialAbilities[index];
  }
  
  export function calculateExpGain(userLevel, enemyLevel) {
    const baseExp = 50;
    let multiplier = 1;
    if (enemyLevel > userLevel) {
      multiplier += (enemyLevel - userLevel) * 0.1;
    } else if (enemyLevel < userLevel) {
      multiplier -= (userLevel - enemyLevel) * 0.05;
      if (multiplier < 0.5) multiplier = 0.5;
    }
    return Math.round(baseExp * multiplier);
  }