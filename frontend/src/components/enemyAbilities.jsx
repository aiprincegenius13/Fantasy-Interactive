// enemyAbilities.jsx

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

// Function to randomly select an ability
export function getRandomSpecialAbility(enemy) {
    if (!enemy.specialAbilities || enemy.specialAbilities.length === 0) return null;
    const index = Math.floor(Math.random() * enemy.specialAbilities.length);
    return enemy.specialAbilities[index];
}

export default { abilities, getRandomSpecialAbility };
