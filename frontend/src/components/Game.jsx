import React from 'react';
import useStore from '../store';

const API_URL = "http://localhost:8081/api";

// Dummy story data structure for demonstration.
// Expand this array to create a full 10‑hour interactive narrative.
const storyData = [
  {
    id: 0,
    text: "You awaken in a dark forest. The path diverges. Do you choose the left trail towards the ancient ruins or the right path into the dense woods?",
    choices: [
      { text: "Take the left trail", next: 1 },
      { text: "Take the right path", next: 2 }
    ]
  },
  {
    id: 1,
    text: "You approach the ruins. A mysterious enemy appears!",
    choices: [
      { text: "Fight the enemy", next: "combat" },
      { text: "Run away", next: 3 }
    ]
  },
  {
    id: 2,
    text: "You venture into the woods and find a peaceful clearing. A wise sage offers guidance.",
    choices: [
      { text: "Listen to the sage", next: 4 },
      { text: "Ignore and continue", next: 3 }
    ]
  },
  {
    id: 3,
    text: "You continue on your journey, facing new challenges and adventures.",
    choices: [
      { text: "Continue", next: 0 } // Loop back for demonstration
    ]
  },
  {
    id: 4,
    text: "The sage teaches you secrets of the ancient arts. You feel your power increase.",
    choices: [
      { text: "Thank the sage and leave", next: 0 }
    ]
  }
];

// Sample enemy object with three special abilities
const sampleEnemy = {
  name: "Goblin Warlord",
  stats: {
    life: 80,
    mana: 30,
    stamina: 50,
    dexterity: 15,
    strength: 20,
    agility: 10
  },
  specialAbilities: ["Slash", "Roar", "Quick Strike"]
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
    
    // Check if level up criteria are met (example: every level requires 200 EXP)
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
      // For demo purposes, after combat, return to scene 0.
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
