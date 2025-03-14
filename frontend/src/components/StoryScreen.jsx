import React, { useState } from "react";
import useStore from "../store";

const API_URL = "http://localhost:8081/api"; // Fixed API endpoint

const storyData = [
  {
    id: 0,
    text: "You awaken in a cold, dim dungeon. All around you, a low, ominous breathing echoes everywhere around you. In front of you hover three portals: a glowing GREEN portal, a mysterious BLUE portal, and a flickering RED portal.",
    choices: [
      { text: "Enter the GREEN portal", next: 1 },
      { text: "Enter the BLUE portal", next: "combat"},
      { text: "Enter the RED portal", next: "combat" }
    ]
  },
  {
    id: 1,
text: "Walking down a decline in the dungeon, footsteps approach you.",
choices: [
  { text: "Follow the footsteps", next: 2 },
  { text: "hide until the footsteps pass the footsteps", next: 5 },
  { text: "fight the figure", next: "combat" }],
},
  {
    id: 2,
    text: "You find yourself in a dark, gloomy cavern. A tall, ominous figure stands before you, its shadow casting a shadowy light on the cavern.",
    choices: [
      { text: "Sneak by the figure and ascend steps", next: 3 },
      { text: "Run away from the figure", next: 0 },
      { text: "fight the figure", next: "combat" }
    ]
  },
  {
    id: 3,
    text: "As you ascend the steps, a dark, ominous figure appears before you. It beckons you to a fight, and you cannot refuse.",
    choices: [
      { text: "fight the figure", next: "combat" },
    ]},
    {
      id: 4,
      text: "After a hard won battle you notice you are in a new corrior.",
      choices: [
        { text: "Speedily run down the corridor", next: 5 },
        { text: "USe an item from your inventory", next: 7 },
        { text: "Carefully walk down corridor", next: 6 }
      ]

    },
  {
    id: 50,
    text: "Final Stats and Game Over Summary. Reflect on your epic journey.",
    choices: [
      { text: "Restart the journey", next: 0 },
      { text: "Exit the game", next: "exit" },
      { text: "Review your achievements", next: 50 }
    ]
  }
];

const StoryScreen = ({ currentScene, onChoice }) => {
  const user = useStore(state => state.user);
  const character = useStore(state => state.character);
  const inventory = useStore(state => state.inventory);
  const experience = useStore(state => state.experience);
  const level = useStore(state => state.level);
  const [saving, setSaving] = useState(false);

  // Fixed Save Game Function
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
      level
    };

    try {
      const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, gameState })
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

  const node = storyData.find(n => n.id === currentScene);
  if (!node) return <div>No story available.</div>;

  return (
    <div className="story-screen">
      <h3>Story</h3>
      <p>{node.text}</p>
      <div className="choices">
        {node.choices.map((choice, idx) => (
          <button key={idx} onClick={() => onChoice(choice)}>
            {choice.text}
          </button>
        ))}
      </div>

      {/* Fixed Save Game Button */}
      <button onClick={saveGame} disabled={saving}>
        {saving ? "Saving..." : "Save Game"}
      </button>
    </div>
  );
};

export default StoryScreen;
