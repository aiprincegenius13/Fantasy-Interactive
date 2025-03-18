import React, { useState } from "react";
import useStore from "../store";
import BattleScreen from "./BattleScreen";

const API_URL = "http://localhost:8081/api"; // Backend API endpoint

const storyData = [
  {
    id: 0,
    text: "You awaken in a cold, dim dungeon. In front of you hover three portals: a glowing GREEN portal, a mysterious BLUE portal, and a flickering RED portal.",
    choices: [
      { text: "Enter the GREEN portal", next: 1 },
      { text: "Enter the BLUE portal", next: "combat" },
      { text: "Enter the RED portal", next: "combat" },
    ],
  },
  {
    id: 1,
    text: "Walking down a decline in the dungeon, footsteps approach you.",
    choices: [
      { text: "Follow the footsteps", next: 2 },
      { text: "Hide until they pass", next: 5 },
      { text: "Fight the figure", next: "combat" },
    ],
  },

  {
    id: 2,
    text: "SOon you come to a three way split in the cooridor after the footsteps pass and you successfully avoid detection.",
    choices: [
      { text: "Take the left pathe", next: 4 },
      { text: "Take the middle path", next: "combat" },
      { text: "Take the right path", next: 3 },
    ]
  },
  {
    id: 3,
    text: "You continue on as the powerful adveenturer you are, you find a few items of epic quality, and while you examine yur new items you are approached from behind.",
    choices: [
      { text: "Stay perfectly still guaging the distance between you and the creature behind your", next: 5 },
      { text: "TUrn with your weapon drawn and swing blindly", next: 4 },
      { text: "TUrn and back away getig some distance", next: "combat" },
    ]
},
  {
    id: 4,
    text: "After a hard-won battle, you find yourself in a new corridor.",
    choices: [
      { text: "Run down the corridor", next: 5 },
      { text: "You find an item and place it in your inventory", next: 7 },
      { text: "Walk cautiously down the corridor", next: 6 },
    ],
  },
  {
    id: 5,
    text: "You find yourself in a small room with a single door.",
    choices: [
      { text: "Open the door", next: 6 },
      { text: "Try to force open the door", next: 7 },
      { text: "Try to reason with the creature", next: "combat" },
    ]
},
{
  id: 6,
  text: "You realize the door is locked, you use your lockpick skills to quietly oopen the door.",
  choices: [
    { text: "Sneak inside", next: 8 },
    { text: "aWalk in the door carelessly", next: "combat" },
    { text: "Crack the door and throw in a mana bomb", next: 9 },
  ]
},
{
  id: 7,
  text: "The room is filled with creatures thee is no other choice but to fight",
  choices: [
    { text: "Sneak inside", next: " combat" },
    { text: "aWalk in the door carelessly", next: "combat" },
    { text: "Crack the door and throw in a mana bomb", next: "combat" },
  ]
},
];

const StoryScreen = () => {
  const user = useStore((state) => state.user);
  const character = useStore((state) => state.character);
  const inventory = useStore((state) => state.inventory);
  const experience = useStore((state) => state.experience);
  const level = useStore((state) => state.level);
  const [currentScene, setCurrentScene] = useState(0);
  const [inBattle, setInBattle] = useState(false);
  const [saving, setSaving] = useState(false);

  // Handle user choices
  const handleChoice = (choice) => {
    if (choice.next === "combat") {
      setInBattle(true); // Switch to battle mode
    } else {
      setCurrentScene(choice.next);
    }
  };

  // Handle battle results and return to story
  const handleBattleEnd = (playerWon) => {
    setInBattle(false);
    if (playerWon) {
      setCurrentScene(4); // Move to post-battle story
    } else {
      alert("You were defeated! Restarting the story...");
      setCurrentScene(0);
    }
  };

  // Save game function
  const saveGame = async () => {
    if (!user) {
      alert("Error: No user logged in. Please log in first.");
      return;
    }

    setSaving(true);

    const gameState = {
      currentScene,
      character,
      inventory,
      experience,
      level,
    };

    try {
      const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, gameState }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error saving game.");
      }

      const data = await response.json();
      alert(data.message || "Game saved successfully!");
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (inBattle) {
    return <BattleScreen onBattleEnd={handleBattleEnd} />;
  }

  const node = storyData.find((n) => n.id === currentScene);
  if (!node) return <div>No story available.</div>;

  return (
    <div className="story-screen">
      <h3>Story</h3>
      <p>{node.text}</p>
      <div className="choices">
        {node.choices.map((choice, idx) => (
          <button key={idx} onClick={() => handleChoice(choice)}>
            {choice.text}
          </button>
        ))}
      </div>

      {/* Save Game Button */}
      <button onClick={saveGame} disabled={saving}>
        {saving ? "Saving..." : "Save Game"}
      </button>
    </div>
  );
};

export default StoryScreen;
