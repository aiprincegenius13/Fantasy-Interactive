import React, { useState } from "react";
import useStore from "../store";

const API_URL = "http://localhost:8081"; // Ensure API is correctly set

const storyData = [
  {
    id: 0,
    text: "You awaken in a cold, dim dungeon. All around you, a low, ominous breathing echoes everywhere around you. In front of you hover three portals: a glowing GREEN portal, a mysterious BLUE portal, and a flickering RED portal.",
    choices: [
      { text: "Enter the GREEN portal", next: 1 },
      { text: "Enter the BLUE portal", next: "combat" },
      { text: "Enter the RED portal", next: "combat" }
    ]
  },
  {
    id: 1,
    text: "You step into the GREEN portal. The environment shifts but the oppressive dungeon remains.",
    choices: [
      { text: "Enter the GREEN portal again", next: 2 },
      { text: "Switch to the BLUE portal", next: 20 },
      { text: "Switch to the RED portal", next: 40 }
    ]
  },
  {
    id: 2,
    text: "You step into the GREEN portal. The environment shifts but the oppressive dungeon remains.",
    choices: [
      { text: "Enter the GREEN portal again", next: "combat" },
      { text: "Switch to the BLUE portal", next: 3},
      { text: "Switch to the RED portal", next: "combat" }
    ]
  },
  {
    id: 3,
    text: "You step into the GREEN portal. The environment shifts but the oppressive dungeon remains.",
    choices: [
      { text: "Enter the GREEN portal again", next: "combat" },
      { text: "Switch to the BLUE portal", next: "combat" },
      { text: "Switch to the RED portal", next: 4}
    ]
  },
  {
    id: 4,
    text: "You step into the GREEN portal. The environment shifts but the oppressive dungeon remains.",
    choices: [
      { text: "Enter the GREEN portal again", next: 6 },
      { text: "Switch to the BLUE portal", next: "combat" },
      { text: "Switch to the RED portal", next: 5 }
    ]
  },
  {
  id: 5,
  text: "You step into the GREEN portal. The environment shifts but the oppressive dungeon remains.",
  choices: [
    { text: "Enter the GREEN portal again", next: 6 },
    { text: "Switch to the BLUE portal", next: "combat" },
    { text: "Switch to the RED portal", next: 5 }
  ]
},
  {
    id: 6,
    text: "You step into the GREEN portal. The environment shifts but the oppressive dungeon remains.",
    choices: [
      { text: "Enter the GREEN portal again", next: 8 },
      { text: "Switch to the BLUE portal", next: 7 },
      { text: "Switch to the RED portal", next: "combat" }
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
  const gameState = useStore(state => state); // Fetch the entire game state
  const [saving, setSaving] = useState(false); // Add saving state

  // Save game function
  const saveGame = async () => {
    if (!user) {
      alert("Error: No user logged in.");
      return;
    }

    setSaving(true); // Indicate saving process

    try {
      const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, gameState })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      alert(data.message || "Game saved successfully!");
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game. Please try again.");
    } finally {
      setSaving(false); // Reset saving state
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

      {/* Fixed Save Game Button (Line 80) */}
      <button onClick={saveGame} disabled={saving}>
        {saving ? "Saving..." : "Save Game"}
      </button>
    </div>
  );
};

export default StoryScreen;
