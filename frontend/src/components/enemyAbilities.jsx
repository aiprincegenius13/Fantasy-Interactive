// enemyAbilities.jsx
export const Abilities = {
    "Ensnare": { damage: 10, effect: "Immobilizes the player for 2 seconds" },
    "Root Strike": { damage: 15, effect: "Stuns the player for 1 second" },
    "Uproot": { damage: 20, effect: "Deals damage over time" },
    "Acid Breath": { damage: 25, effect: "Deals damage over time" },
    "Wind Attack": { damage: 10, effect: "Pushes the player back" },
    "Double Slash": { damage: 20, effect: "Strikes twice" },
    "Fear": { damage: 0, effect: "Reduces player's accuracy" },
    "Slash": { damage: 15, effect: "A quick strike" },
    "Poison": { damage: 8, effect: "Poisons the player" },
    "FireBall": { damage: 30, effect: "Burns the player" },
    "Weapon Smash": { damage: 25, effect: "Stuns the player" },
    "Brute Strength": { damage: 20, effect: "Knocks the player back" },
    "Multi-Strike": { damage: 18, effect: "Multiple quick hits" },
    "Intimidate": { damage: 0, effect: "Lowers player's defense" },
    "Stab": { damage: 22, effect: "Deals critical damage" },
    "Meteor Strike": { damage: 35, effect: "Heavy damage to the player" },
    "Life Drain": { damage: 20, effect: "Steals health from the player" },
    "Evasion": { damage: 0, effect: "Increases enemy evasion" }
};

export function getRandomAbility(enemy) {
    if (!enemy || !enemy.abilities || enemy.abilities.length === 0) return null;
    const index = Math.floor(Math.random() * enemy.abilities.length);
    return enemy.abilities[index];
}