import React from 'react';
import useStore from '../store';
// import { Link } from 'react-router-dom';
// import './Game.css';
// import { useHistory } from 'react-router-dom';
// import { useAuth } from '../context/auth';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useRef } from 'react';

const API_URL = "http://localhost:8081/api";

//Story Structure
const storyData = [
  {
    id: 0,
    text: "You awaken in a dark corridor, your head throbbing, as an ominous, rhythmic breathing fills the air. Before you, three portals float in the gloom: a vibrant GREEN portal, a deep BLUE portal, and a fiery RED portal.",
    choices: [
      { text: "Enter the GREEN portal", next: 1 },
      { text: "Enter the BLUE portal", next: 11 },
      { text: "Enter the RED portal", next: 21 }
    ]
  },
  // --- GREEN PORTAL CHAIN (Freedom if chosen 10 times) ---
  {
    id: 1,
    text: "You step into the GREEN portal. The corridor shifts but remains dark; the ominous breathing persists. It feels as though this path might offer escape.",
    choices: [
      { text: "Enter the GREEN portal again", next: 2 },
      { text: "Switch to the BLUE portal", next: 11 },
      { text: "Switch to the RED portal", next: 21 }
    ]
  },
  {
    id: 2,
    text: "Once more, you choose the GREEN portal. The corridor repeats its eerie pattern. You sense hope in the green glow.",
    choices: [
      { text: "Step into the GREEN portal", next: 3 },
      { text: "Take the BLUE portal instead", next: 11 },
      { text: "Take the RED portal instead", next: 21 }
    ]
  },
  {
    id: 3,
    text: "The dark corridor appears again, unchanged except for the growing pull of the GREEN portal. (Green count: 3)",
    choices: [
      { text: "Enter the GREEN portal", next: 4 },
      { text: "Try the BLUE portal", next: 11 },
      { text: "Try the RED portal", next: 21 }
    ]
  },
  {
    id: 4,
    text: "The green light intensifies in the GREEN portal. The corridor still echoes with that ominous breathing. (Green count: 4)",
    choices: [
      { text: "Step into the GREEN portal", next: 5 },
      { text: "Switch to the BLUE portal", next: 11 },
      { text: "Switch to the RED portal", next: 21 }
    ]
  },
  {
    id: 5,
    text: "You proceed through the GREEN portal, feeling that each step brings you closer to freedom. (Green count: 5)",
    choices: [
      { text: "Enter the GREEN portal", next: 6 },
      { text: "Try the BLUE portal", next: 11 },
      { text: "Try the RED portal", next: 21 }
    ]
  },
  {
    id: 6,
    text: "Again the corridor appears. The GREEN portal glows steadily, urging you onward. (Green count: 6)",
    choices: [
      { text: "Step into the GREEN portal", next: 7 },
      { text: "Switch to the BLUE portal", next: 11 },
      { text: "Switch to the RED portal", next: 21 }
    ]
  },
  {
    id: 7,
    text: "You take another step through the GREEN portal. The familiarity of the dark corridor bolsters your resolve. (Green count: 7)",
    choices: [
      { text: "Enter the GREEN portal", next: 8 },
      { text: "Try the BLUE portal", next: 11 },
      { text: "Try the RED portal", next: 21 }
    ]
  },
  {
    id: 8,
    text: "The corridor repeats its form, yet the GREEN portal continues to call you. (Green count: 8)",
    choices: [
      { text: "Step into the GREEN portal", next: 9 },
      { text: "Switch to the BLUE portal", next: 11 },
      { text: "Switch to the RED portal", next: 21 }
    ]
  },
  {
    id: 9,
    text: "You have chosen the GREEN portal nine times. The path feels almost liberating. (Green count: 9)",
    choices: [
      { text: "Enter the GREEN portal one more time", next: 10 },
      { text: "Try the BLUE portal", next: 11 },
      { text: "Try the RED portal", next: 21 }
    ]
  },
  {
    id: 10,
    text: "As you step through the GREEN portal for the 10th time, the dark corridor dissolves into brilliant light. You have finally emerged from the dungeon into freedom. Congratulations!",
    choices: [
      { text: "Restart the journey", next: 0 },
      { text: "Exit the game", next: "exit" },
      { text: "View your final stats", next: 50 }
    ]
  },
  // --- BLUE PORTAL CHAIN (Combat/Traps/Trials) ---
  {
    id: 11,
    text: "You step into the BLUE portal. The corridor turns cold and the breathing becomes distant echoes. Danger lurks ahead.",
    choices: [
      { text: "Proceed cautiously", next: 12 },
      { text: "Fight the unknown", next: "combat" },
      { text: "Return to the starting corridor", next: 0 }
    ]
  },
  {
    id: 12,
    text: "The blue corridor reveals strange, frosty markings on the walls and the sound of clashing weapons in the distance.",
    choices: [
      { text: "Follow the sound", next: 13 },
      { text: "Investigate the markings", next: 14 },
      { text: "Switch to the GREEN portal", next: 1 }
    ]
  },
  {
    id: 13,
    text: "You follow the sound and suddenly encounter a spectral warrior. Prepare for combat!",
    choices: [
      { text: "Engage in combat", next: "combat" },
      { text: "Attempt to flee", next: 15 },
      { text: "Try to negotiate", next: 16 }
    ]
  },
  {
    id: 14,
    text: "Studying the markings, you decipher an ancient warning: the BLUE portal may lead to doom. Yet the sound beckons.",
    choices: [
      { text: "Ignore the warning and proceed", next: 13 },
      { text: "Retreat back", next: 11 },
      { text: "Switch to the RED portal", next: 21 }
    ]
  },
  {
    id: 15,
    text: "You attempt to flee, but the spectral warrior pursues you. You must face the challenge!",
    choices: [
      { text: "Fight desperately", next: "combat" },
      { text: "Dodge and try to escape", next: 11 },
      { text: "Surrender", next: 50 }
    ]
  },
  {
    id: 16,
    text: "The warrior’s echoing voice challenges you to prove your worth. You prepare for battle.",
    choices: [
      { text: "Accept the challenge", next: "combat" },
      { text: "Decline and retreat", next: 11 },
      { text: "Cast a spell against the warrior", next: "combat" }
    ]
  },
  {
    id: 17,
    text: "After the combat, the blue corridor shifts. You sense that more trials lie ahead.",
    choices: [
      { text: "Continue down the blue corridor", next: 18 },
      { text: "Switch to the GREEN portal", next: 1 },
      { text: "Return to the start", next: 0 }
    ]
  },
  {
    id: 18,
    text: "The blue corridor narrows and the air grows colder. A distant, echoing heartbeat resounds.",
    choices: [
      { text: "Investigate the sound", next: 19 },
      { text: "Search for a hidden exit", next: 17 },
      { text: "Return to the corridor entrance", next: 11 }
    ]
  },
  {
    id: 19,
    text: "As the heartbeat intensifies, a monstrous entity emerges from the shadows! Prepare for combat!",
    choices: [
      { text: "Fight the beast", next: "combat" },
      { text: "Attempt to hide", next: 11 },
      { text: "Flee back", next: 11 }
    ]
  },
  // --- RED PORTAL CHAIN (Traps/Combats/Heat) ---
  {
    id: 21,
    text: "You step into the RED portal. The corridor heats up and a sulfurous odor fills your nostrils. The red light radiates danger.",
    choices: [
      { text: "Advance cautiously", next: 22 },
      { text: "Charge ahead", next: 23 },
      { text: "Return to the starting corridor", next: 0 }
    ]
  },
  {
    id: 22,
    text: "The red corridor is fraught with burning debris and scorching walls. The heat is oppressive.",
    choices: [
      { text: "Search for a cooling refuge", next: 24 },
      { text: "Press on despite the heat", next: 23 },
      { text: "Switch to the BLUE portal", next: 11 }
    ]
  },
  {
    id: 23,
    text: "As you charge ahead, you trigger a trap! Flames burst from the walls. Prepare for combat with fiery foes!",
    choices: [
      { text: "Fight the flames", next: "combat" },
      { text: "Dodge through the flames", next: 24 },
      { text: "Retreat quickly", next: 21 }
    ]
  },
  {
    id: 24,
    text: "In the midst of the heat, you find a small alcove with a water basin that briefly cools you.",
    choices: [
      { text: "Drink the water", next: 25 },
      { text: "Rest and recover", next: 25 },
      { text: "Switch back to the RED portal", next: 21 }
    ]
  },
  {
    id: 25,
    text: "Refreshed yet wary, you continue along the red corridor as the oppressive heat lingers.",
    choices: [
      { text: "Press on", next: 26 },
      { text: "Return to the BLUE portal", next: 11 },
      { text: "Search for an exit", next: 27 }
    ]
  },
  {
    id: 26,
    text: "The red corridor twists, revealing gruesome remnants of past victims. A sense of doom weighs on you.",
    choices: [
      { text: "Examine the remains", next: 27 },
      { text: "Hurry past them", next: 27 },
      { text: "Switch to the GREEN portal", next: 1 }
    ]
  },
  {
    id: 27,
    text: "Suddenly, flames erupt from the walls, forcing you into a narrow escape route.",
    choices: [
      { text: "Dodge through the explosion", next: "combat" },
      { text: "Seek cover behind debris", next: 28 },
      { text: "Scream for help", next: 29 }
    ]
  },
  {
    id: 28,
    text: "Taking cover behind fallen stones, you catch your breath while the red corridor remains perilous.",
    choices: [
      { text: "Plan your next move", next: 29 },
      { text: "Switch to a safer portal (BLUE)", next: 11 },
      { text: "Brace for another attack", next: "combat" }
    ]
  },
  {
    id: 29,
    text: "Your cry echoes in the fiery corridor, and for a moment the danger subsides.",
    choices: [
      { text: "Return to the main corridor", next: 0 },
      { text: "Explore further down the RED path", next: 30 },
      { text: "Switch to the GREEN portal", next: 1 }
    ]
  },
  // --- Additional Nodes to reach at least 50 ---
  {
    id: 30,
    text: "You venture deeper into the RED corridor, where shadows dance menacingly on the walls.",
    choices: [
      { text: "Proceed with caution", next: 31 },
      { text: "Charge into the darkness", next: "combat" },
      { text: "Return to the previous area", next: 21 }
    ]
  },
  {
    id: 31,
    text: "The corridor opens into a chamber filled with ancient inscriptions and relics. Mystery and danger intertwine here.",
    choices: [
      { text: "Examine the relics", next: 32 },
      { text: "Ignore them and move on", next: 30 },
      { text: "Switch to the BLUE portal", next: 11 }
    ]
  },
  {
    id: 32,
    text: "While inspecting the relics, a hidden mechanism triggers a trap: arrows fly from the walls!",
    choices: [
      { text: "Dodge the arrows", next: "combat" },
      { text: "Take cover behind a pillar", next: 33 },
      { text: "Try to disable the trap", next: 34 }
    ]
  },
  {
    id: 33,
    text: "You manage to take cover and avoid the barrage of arrows, shaken by the near miss.",
    choices: [
      { text: "Catch your breath and plan", next: 31 },
      { text: "Advance cautiously", next: 30 },
      { text: "Switch to the GREEN portal", next: 1 }
    ]
  },
  {
    id: 34,
    text: "You skillfully disable the trap and stop further arrows. Your quick thinking saves you.",
    choices: [
      { text: "Proceed into the chamber", next: 35 },
      { text: "Search for hidden treasures", next: 36 },
      { text: "Retreat back to the corridor", next: 30 }
    ]
  },
  {
    id: 35,
    text: "Inside the chamber, you discover a mysterious artifact pulsing with energy. Could it be the key to escape?",
    choices: [
      { text: "Take the artifact", next: "combat" },
      { text: "Leave it alone", next: 36 },
      { text: "Examine it further", next: 37 }
    ]
  },
  {
    id: 36,
    text: "You search the chamber and uncover inscriptions hinting at a secret exit. Hope flickers.",
    choices: [
      { text: "Follow the inscriptions", next: 37 },
      { text: "Memorize the clues for later", next: 38 },
      { text: "Switch to the BLUE portal", next: 11 }
    ]
  },
  {
    id: 37,
    text: "Using the clues, you unlock a hidden door that leads to a narrow passage.",
    choices: [
      { text: "Enter the passage", next: 40 },
      { text: "Examine the door for traps", next: 38 },
      { text: "Retreat back", next: 36 }
    ]
  },
  {
    id: 38,
    text: "You find that the door is rigged with traps—but you manage to disarm them with caution.",
    choices: [
      { text: "Enter the door safely", next: 40 },
      { text: "Retreat and explore another path", next: 30 },
      { text: "Switch to the GREEN portal", next: 1 }
    ]
  },
  {
    id: 39,
    text: "You stumble upon a dead end where the corridor seems to close in on you.",
    choices: [
      { text: "Search for hidden levers", next: 41 },
      { text: "Return to the main corridor", next: 0 },
      { text: "Take a leap of faith", next: "combat" }
    ]
  },
  {
    id: 40,
    text: "Congratulations! Through perseverance you have discovered a secret exit from the dungeon. Freedom is yours.",
    choices: [
      { text: "Restart the journey", next: 0 },
      { text: "Exit the game", next: "exit" },
      { text: "View your final stats", next: 50 }
    ]
  },
  {
    id: 41,
    text: "You find a concealed lever. Pulling it, a hidden passage opens, revealing a new path.",
    choices: [
      { text: "Enter the passage", next: 42 },
      { text: "Return to the corridor", next: 0 },
      { text: "Switch to the RED portal", next: 21 }
    ]
  },
  {
    id: 42,
    text: "The new passage leads deeper into the dungeon; the air grows heavy with anticipation.",
    choices: [
      { text: "Proceed cautiously", next: 43 },
      { text: "Charge ahead", next: "combat" },
      { text: "Retreat back", next: 41 }
    ]
  },
  {
    id: 43,
    text: "In the depths of the passage, you encounter a group of hostile creatures. Prepare for combat!",
    choices: [
      { text: "Fight", next: "combat" },
      { text: "Attempt to hide", next: 42 },
      { text: "Try to negotiate", next: 44 }
    ]
  },
  {
    id: 44,
    text: "Your negotiation fails and the creatures attack!",
    choices: [
      { text: "Fight for your life", next: "combat" },
      { text: "Run away", next: 41 },
      { text: "Sacrifice an item to appease them", next: 45 }
    ]
  },
  {
    id: 45,
    text: "The creatures relent momentarily, giving you a brief window to escape.",
    choices: [
      { text: "Seize the opportunity and escape", next: 46 },
      { text: "Search for useful items", next: 47 },
      { text: "Rest for a while", next: 48 }
    ]
  },
  {
    id: 46,
    text: "You dash through the passage, evading the creatures and emerging into another dark corridor.",
    choices: [
      { text: "Explore further", next: 49 },
      { text: "Return to the main area", next: 0 },
      { text: "Switch to the GREEN portal", next: 1 }
    ]
  },
  {
    id: 47,
    text: "Among the scattered items, you find a healing potion that restores some strength.",
    choices: [
      { text: "Drink the potion", next: 48 },
      { text: "Save it for later", next: 49 },
      { text: "Share it with an ally", next: 49 }
    ]
  },
  {
    id: 48,
    text: "Refreshed and reinvigorated, you press on with newfound determination.",
    choices: [
      { text: "Advance cautiously", next: 49 },
      { text: "Charge ahead", next: "combat" },
      { text: "Rest a bit longer", next: 47 }
    ]
  },
  {
    id: 49,
    text: "You reach a junction in the passage, with paths diverging in multiple directions.",
    choices: [
      { text: "Take the left path (GREEN chain)", next: 1 },
      { text: "Take the middle path (BLUE chain)", next: 11 },
      { text: "Take the right path (RED chain)", next: 21 }
    ]
  },
  {
    id: 50,
    text: "Final Stats and Game Over Summary. Reflect on your journey.",
    choices: [
      { text: "Restart the journey", next: 0 },
      { text: "Exit the game", next: "exit" },
      { text: "Review your achievements", next: 50 }
    ]
  }
];


// Enemy Object with SPecial Abilities
const sampleEnemy = {
  name: "Dungeon Guard",
  stats: {
    life: 100,
    mana: 30,
    stamina: 80,
    dexterity: 12,
    strength: 15,
    agility: 10
  },
  specialAbilities: ["Ensare", "Root Strike", "Uproot"],
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
