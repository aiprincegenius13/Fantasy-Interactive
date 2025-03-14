// enemyAbilities.jsx
// Contains definitions for enemy abilities and functions to manage enemy behavior

export const abilities = {
    "Ensare": { damage: 10, effect: "Immobilizes the player for 2 seconds" },
    "Root Strike": { damage: 15, effect: "Stuns the player for 1 second" },
    "Uproot": { damage: 20, effect: "Deals damage over time" },
    "Fly": { damage: 5, effect: "Dodges attacks" },
    "Acid Breath": { damage: 25, effect: "Deals damage over time" },
    "Wind Attack": { damage: 10, effect: "Pushes the player back" },
    "Double Slash": { damage: 20, effect: "Strikes twice" },
    "Fear": { damage: 0, effect: "Reduces player's accuracy" },
    "Dynamic Strike": { damage: 18, effect: "Chance to stun" },
    "Slash": { damage: 15, effect: "A quick strike" },
    "Roar": { damage: 0, effect: "Lowers player's morale" },
    "Quick Strike": { damage: 12, effect: "A fast attack" },
    "Bite": { damage: 10, effect: "May cause bleeding" },
    "Poison": { damage: 8, effect: "Poisons the player" },
    "Ambush": { damage: 15, effect: "Surprise attack with increased damage" },
    "FireBall": { damage: 30, effect: "Burns the player" },
    "Ensnare": { damage: 5, effect: "Immobilizes the player" },
    "Blind": { damage: 0, effect: "Reduces player's accuracy" },
    "Weapon Smash": { damage: 25, effect: "Stuns the player" },
    "Brute Strength": { damage: 20, effect: "Knocks the player back" },
    "Taunt": { damage: 0, effect: "Forces player to target the enemy" },
    "Loot": { damage: 0, effect: "Steals items" },
    "Multi-Strike": { damage: 18, effect: "Multiple quick hits" },
    "Intimidate": { damage: 0, effect: "Lowers player's defense" },
    "Steal": { damage: 0, effect: "Steals gold from the player" },
    "Acrobatics": { damage: 0, effect: "Dodges attacks" },
    "Stab": { damage: 22, effect: "Deals critical damage" },
    "Dark Flame": { damage: 28, effect: "Burns the player over time" },
    "Ice Storm": { damage: 26, effect: "Slows the player" },
    "Meteor Strike": { damage: 35, effect: "Heavy damage to the player" },
    "Raise Dead": { damage: 0, effect: "Revives fallen allies" },
    "Death Magic": { damage: 32, effect: "Massive dark damage" },
    "Heal undead": { damage: -20, effect: "Heals undead allies" },
    "Regenerate": { damage: 0, effect: "Restores enemy health slowly" },
    "Life Drain": { damage: 20, effect: "Steals health from the player" },
    "Evasion": { damage: 0, effect: "Increases enemy evasion" }
  };
  
  // Randomly choose one special ability from the enemy's specialAbilities array
  export function getRandomSpecialAbility(enemy) {
    if (!enemy.specialAbilities || enemy.specialAbilities.length === 0) return null;
    const index = Math.floor(Math.random() * enemy.specialAbilities.length);
    return enemy.specialAbilities[index];
  }
  
  // Calculate experience gain based on user and enemy levels.
  // The base EXP is increased by 10% for every level the enemy is higher than the user,
  // or decreased by 5% if the enemy is lower (with a minimum multiplier of 0.5).
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
  
  // Generate a random enemy from an array of sample enemy templates.
  // 10% of the time, the enemy's level is set to be three times the user's level.
  export function generateEnemy(userLevel) {
    const sampleEnemies = [
      {
        name: "Goblin",
        baseStats: { life: 80, mana: 30, stamina: 50, dexterity: 15, strength: 20, agility: 10 },
        abilities: ["Slash", "Quick Strike"],
        specialAbilities: ["Steal", "Ambush"]
      },
      {
        name: "Orc Warrior",
        baseStats: { life: 120, mana: 20, stamina: 80, dexterity: 10, strength: 40, agility: 15 },
        abilities: ["Weapon Smash", "Brute Strength"],
        specialAbilities: ["Taunt", "Roar"]
      },
      {
        name: "Dark Mage",
        baseStats: { life: 70, mana: 150, stamina: 60, dexterity: 20, strength: 15, agility: 12 },
        abilities: ["Dark Flame", "Ice Storm"],
        specialAbilities: ["Meteor Strike", "Death Magic"]
      },
      {
        name: "Undead Warrior",
        baseStats: { life: 100, mana: 30, stamina: 70, dexterity: 10, strength: 30, agility: 10 },
        abilities: ["Slash", "Regenerate"],
        specialAbilities: ["Raise Dead", "Death Magic"]
      },
      {
        name: "Vampire",
        baseStats: { life: 90, mana: 50, stamina: 70, dexterity: 20, strength: 35, agility: 25 },
        abilities: ["Life Drain", "Quick Strike"],
        specialAbilities: ["Evasion", "Bite"]
      },
      {
        name: "Wyvern",
        baseStats: { life: 150, mana: 40, stamina: 100, dexterity: 30, strength: 50, agility: 35 },
        abilities: ["Acid Breath", "Wind Attack"],
        specialAbilities: ["Fly", "Roar"]
      },
      {
        name: "Goblin Shaman",
        baseStats: { life: 80, mana: 120, stamina: 60, dexterity: 15, strength: 18, agility: 12 },
        abilities: ["FireBall", "Ensnare"],
        specialAbilities: ["Blind", "Intimidate"]
      },
      {
        name: "Bandit",
        baseStats: { life: 85, mana: 25, stamina: 55, dexterity: 18, strength: 22, agility: 18 },
        abilities: ["Multi-Strike", "Quick Strike"],
        specialAbilities: ["Loot", "Steal"]
      },
      {
        name: "Lich",
        baseStats: { life: 70, mana: 150, stamina: 60, dexterity: 20, strength: 25, agility: 15 },
        abilities: ["Death Magic", "Raise Dead"],
        specialAbilities: ["Heal undead", "Meteor Strike"]
      },
      {
        name: "Beast",
        baseStats: { life: 130, mana: 20, stamina: 90, dexterity: 15, strength: 45, agility: 20 },
        abilities: ["Bite", "Claw Strike"],
        specialAbilities: ["Roar", "Ambush"]
      }
    ];
    
    // Pick a random enemy template.
    const enemyTemplate = sampleEnemies[Math.floor(Math.random() * sampleEnemies.length)];
    
    // Determine enemy level.
    // 10% chance the enemy is three times as strong as the user; otherwise, adjust level by -1, 0, or +1.
    let enemyLevel;
    if (Math.random() < 0.1) {
      enemyLevel = userLevel * 3;
    } else {
      enemyLevel = userLevel + Math.floor(Math.random() * 3) - 1;
      if (enemyLevel < 1) enemyLevel = 1;
    }
    
    // Scale enemy stats based on enemy level.
    const scaledStats = {};
    for (let stat in enemyTemplate.baseStats) {
      scaledStats[stat] = enemyTemplate.baseStats[stat] * enemyLevel;
    }
    
    return {
      ...enemyTemplate,
      level: enemyLevel,
      stats: scaledStats
    };
  }
  