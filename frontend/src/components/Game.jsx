import React from 'react';
import useStore from '../store';

const API_URL = "http://localhost:8081/api";

//Story Structure
const storyData = [
  {
    id: 0,
    text: "",
    choices: [
      { text: "", next: 1 },
      { text: "", next: 2 }
    ]
  },
  {
    id: 1,
    text: "",
    choices: [
      { text: "Fight the enemy", next: "combat" },
      { text: "Run away", next: 3 }
    ]
  },
  {
    id: 2,
    text: "",
    choices: [
      { text: "", next: 4 },
      { text: "", next: 3 }
    ]
  },
  {
    id: 3,
    text: "",
    choices: [
      { text: "", next:  } 
    ]
  },
  {
    id: 4,
    text: "",
    choices: [
      { text: "", next:  }
    ]
  },
  {
    id: 5,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 6,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 7,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 8,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 9,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 10,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 11,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 12,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },  {
    id: 13,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 14,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 15,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 16,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 17,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 18,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 19,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
  {
    id: 20,
    text: "",
    choices: [
      { text: "", next:  },
      { text: "", next:  }
    ]
  },
];

// Enemy Object with SPecial Abilities
const sampleEnemy = {
  name: "Living Tree",
  stats: {
    life: 80,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 20,
    agility: 10
  },
  specialAbilities: ["Ensare", "Root Strike", "Uproot"],
  name: "Wyvern",
  stats: {
    life: 200,
    mana: 30,
    stamina: 150,
    dexterity: 150,
    strength: 200,
    agility: 125
  },
  specialAbilities: ["Fly", "Acid Breath", "Wind Attack"],
  name: "Goblin Warlord",
  stats: {
    life: 100,
    mana: 30,
    stamina: 125,
    dexterity: 150,
    strength: 200,
    agility: 100
  },
  specialAbilities: ["double SLash", "Fear", "Dynamic Strike"],
  name: "Goblin",
  stats: {
    life: 80,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 20,
    agility: 10
  },
  specialAbilities: ["Slash", "Roar", "Quick Strike"],
  name: "Hobgoblin",
  stats: {
    life: 90,
    mana: 30,
    stamina: 75,
    dexterity: 1100,
    strength: 90,
    agility: 100
  },
  specialAbilities: ["Bite", "Poison", "Ambush"],
  name: "Goblin Shamen",
  stats: {
    life: 100,
    mana: 200,
    stamina: 50,
    dexterity: 15,
    strength: 40,
    agility: 10
  },
  specialAbilities: ["FireBall", "Ensnare", "Blind"],
  name: "Orc",
  stats: {
    life: 100,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 140,
    agility: 75
  },
  specialAbilities: ["Weapon Smash", "Brute Strength", "Taunt"],
  name: "Bandit",
  stats: {
    life: 80,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 20,
    agility: 10
  },
  specialAbilities: ["Loot", "Multi-Stirike", "Intimidate"],
  name: "Thief",
  stats: {
    life: 80,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 20,
    agility: 10
  },
  specialAbilities: ["Steal", "Acrobatics", "Stab"],
  name: "Evil Mage",
  stats: {
    life: 80,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 20,
    agility: 10
  },
  specialAbilities: ["Dark Flame", "Ice Storm", "Meteor Strike"],
  name: "Lich",
  stats: {
    life: 80,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 20,
    agility: 10
  },
  specialAbilities: ["Raise Dead", "Death Magic", "Heal undead"],
  name: "Undead",
  stats: {
    life: 80,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 20,
    agility: 10
  },
  specialAbilities: ["Bite", "Regenerate", "Slash"],
  name: "Vampire",
  stats: {
    life: 80,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 20,
    agility: 10
  },
  specialAbilities: ["Life Drain", "Bite", "Evasion"]
};

function Game() {
  const {
    character,
    currentScene,
    setCurrentScene,
    addExperience,
    level,
    experience,
    levelUp,
    addAbility,
    user
  } = useStore();

  const updateStory = async (next) => {
    // Save game state after making a choice
    useStore.setState({ currentScene: next });
    await fetch(`${API_URL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, gameState: useStore.getState() })
    });
    setCurrentScene(next);
  };

  const startCombat = () => {
    // Simple combat simulation: compare player's strength with enemy strength
    const playerStrength = character.stats.strength;
    const enemyStrength = sampleEnemy.stats.strength;
    const diffPercent = Math.abs(playerStrength - enemyStrength) / enemyStrength;
    const expEarned = Math.round(diffPercent * 100);
    addExperience(expEarned);
    
    // Check if level up criteria are met after combat
    if (experience + expEarned >= level * 200) {
      levelUp();
      alert(`Congratulations! You reached level ${level + 1}. Your stats have increased!`);
    }
    
    // After combat, let the player choose one of the enemy's abilities
    alert(`You defeated ${sampleEnemy.name} and earned ${expEarned} EXP! Now choose one ability from the enemy to add to your skills.`);
  };

  const handleChoice = async (choice) => {
    if (choice.next === "combat") {
      startCombat();
      // update story
      await updateStory(0);
    } else {
      await updateStory(choice.next);
    }
  };

  // Find the current story node
  const node = storyData.find(n => n.id === currentScene);
  if (!node) return <div>No story available.</div>;

  return (
    <div className="screen">
      <div className="stats">
        <h3>Player Stats</h3>
        <p>
          Name: {user} | Alignment: {character.alignment} | Class: {character.class} <br />
          Life: {character.stats.life}, Mana: {character.stats.mana}, Stamina: {character.stats.stamina}, 
          Dexterity: {character.stats.dexterity}, Strength: {character.stats.strength}, Agility: {character.stats.agility} <br />
          Level: {level} | EXP: {experience}
        </p>
      </div>
      <div className="story">
        <h3>Story</h3>
        <p>{node.text}</p>
        <div className="choices">
          {node.choices.map((choice, idx) => (
            <button key={idx} onClick={() => handleChoice(choice)}>
              {choice.text}
            </button>
          ))}
        </div>
      </div>
      <button onClick={async () => {
        await fetch(`${API_URL}/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user, gameState: useStore.getState() })
        });
        alert("Game saved!");
      }}>Save Game</button>
    </div>
  );
}

export default Game;
