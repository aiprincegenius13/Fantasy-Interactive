// Game.jsx :contentReference[oaicite:1]{index=1}
import React from "react";
import useStore from "../store";
import BattleScreen from "./BattleScreen";

const API_URL = "http://localhost:8081/api";

const storyData = [
  // … (existing story nodes remain unchanged)
];

const sampleEnemy = {
  name: "Dungeon Troll",
  stats: { life: 100, mana: 0, stamina: 80, dexterity: 20, strength: 200, agility: 10 },
  specialAbilities: ["Club Smash", "Stomp", "Crushing Blow"],
  name: "Dungeonl Ogre",
  stats: { life: 100, mana: 0, stamina: 80, dexterity: 40, strength: 150, agility: 35 },
  specialAbilities: ["Club Smash", "Kick", "Intimidation"],
  name: "Dungeon Skeleton Knight",
  stats: { life: 100, mana: 0, stamina: 80, dexterity: 40, strength: 100, agility: 10 },
  specialAbilities: ["Strike", "Sword Slash", "Shield Bash"],
  name: "Dungeon Goblin",
  stats: { life: 100, mana: 0, stamina: 80, dexterity: 40, strength: 100, agility: 50 },
  specialAbilities: ["Club Smash", "Bite", "Roar"],
  name: "Dungeon Hobgoblin",
  stats: { life: 100, mana: 0, stamina: 80, dexterity: 75, strength: 100, agility: 75 },
  specialAbilities: ["Club Smash", "Bite", "Ambush"],
  name: "Dungeon Gragon",
  stats: { life: 400, mana: 600, stamina: 180, dexterity: 300, strength: 500, agility: 200 },
  specialAbilities: ["Dragon Breath", "Bite", "Roar"],
  name: "SLime",
  stats: { life: 100, mana: 0, stamina: 80, dexterity: 40, strength: 100, agility: 50 },
  specialAbilities: ["Acide Blast", "Devour", "Poison"],

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
    user,
    setScreen
  } = useStore();
  const screen = useStore(state => state.screen);

  // This function updates the story node and saves state
  const updateStory = async (next) => {
    useStore.setState({ currentScene: next });
    await fetch(`${API_URL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, gameState: useStore.getState() })
    });
  };

  // Callback to handle battle outcome
  const handleBattleEnd = async (won) => {
    if (won) {
      alert("Victory! Returning to the story.");
      await updateStory(0); // Return to a chosen scene (adjust as needed)
      setScreen("game");
    } else {
      // Increment defeat count (initialize to 0 if undefined)
      const defeats = useStore.getState().defeats || 0;
      const newDefeats = defeats + 1;
      useStore.setState({ defeats: newDefeats });
      alert(`Defeat! You have lost a battle. Total defeats: ${newDefeats}`);
      if (newDefeats >= 3) {
        alert("You have lost all remaining lives. Please create a new character.");
        // Call backend deletion endpoint to remove user character
        await fetch(`${API_URL}/delete/${user}`, { method: "DELETE" });
        setScreen("customization");
      } else {
        await updateStory(0);
        setScreen("game");
      }
    }
  };

  // If the screen state is set to battle, render the battle screen
  if (screen === "battle") {
    return <BattleScreen enemy={sampleEnemy} onBattleEnd={handleBattleEnd} />;
  }

  // Otherwise, render the story view as before
  const node = storyData.find(n => n.id === currentScene);
  if (!node) return <div>No story available.</div>;

  const handleChoice = async (choice) => {
    if (choice.next === "combat") {
      setScreen("battle");
    } else if (choice.next === "exit") {
      useStore.setState({ screen: "login" });
    } else {
      await updateStory(choice.next);
    }
  };

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
