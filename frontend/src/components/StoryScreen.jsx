import React from "react";
import useStore from "../store";

const API_URL = "http://localhost:8081"; // Backend URL

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
  const user = useStore(state => state.user); // Retrieve user from store
  const gameState = useStore(state => state); // Get full game state

  const saveGame = async () => {
    if (!user) {
      alert("Error: No user logged in.");
      return;
    }

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
      <button onClick={saveGame}>Save Game</button>
    </div>
  );
};

export default StoryScreen;
