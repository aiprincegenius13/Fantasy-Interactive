import React from "react";
import useStore from "../store";

// Set the API_URL to match the backend endpoints (without the /api suffix)
const API_URL = "http://localhost:8081";

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
    text: "The corridor repeats itself. The green glow reassures you.",
    choices: [
      { text: "Step into the GREEN portal", next: 3 },
      { text: "Try the BLUE portal", next: 20 },
      { text: "Try the RED portal", next: 40 }
    ]
  },
  {
    id: 3,
    text: "The corridor continues. The green glow grows.",
    choices: [
      { text: "Step into the GREEN portal", next: 4 },
      { text: "Try the BLUE portal", next: 20 },
      { text: "Try the RED portal", next: 40 }
    ]
  },
  {
    id: 4,
    text: "The corridor continues. The green glow grows.",
    choices: [
      { text: "Step into the GREEN portal", next: 5 },
      { text: "Try the BLUE portal", next: 20 },
      { text: "Try the RED portal", next: 40 }
    ]
  },
  {
    id: 5,
    text: "The corridor continues. The green glow grows.",
    choices: [
      { text: "Step into the GREEN portal", next: 6 },
      { text: "Try the BLUE portal", next: 20 },
      { text: "Try the RED portal", next: 40 }
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
  // Get the current user from the store
  const user = useStore(state => state.user);

  // Save function that sends the entire game state to the backend
  const saveGame = async () => {
    try {
      const gameState = useStore.getState(); // Retrieve the entire game state
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
      {/* Save button to persist game state */}
      <button onClick={saveGame}>Save Game</button>
    </div>
  );
};

export default StoryScreen;
