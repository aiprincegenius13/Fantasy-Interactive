// StoryScreen.jsx
import React from "react";

const API_URL = "http://localhost:8081/api";

const storyData = [
  {
    id: 0,
    text: "You awaken in a cold, dim dungeon. All around you, a low, ominous breathing echoes. In front of you hover three portals: a glowing GREEN portal, a mysterious BLUE portal, and a flickering RED portal.",
    choices: [
      { text: "Enter the GREEN portal", next: 1 },
      { text: "Enter the BLUE portal", next: 20 },
      { text: "Enter the RED portal", next: 40 }
    ]
  },
  {
    id: 1,
    text: "You step into the GREEN portal. The environment shifts but the oppressive dungeon remains. (Green count: 1)",
    choices: [
      { text: "Enter the GREEN portal again", next: 2 },
      { text: "Switch to the BLUE portal", next: 20 },
      { text: "Switch to the RED portal", next: 40 }
    ]
  },
  {
    id: 2,
    text: "The corridor repeats itself. The green glow reassures you. (Green count: 2)",
    choices: [
      { text: "Step into the GREEN portal", next: 3 },
      { text: "Try the BLUE portal", next: 20 },
      { text: "Try the RED portal", next: 40 }
    ]
  },
  // ... (Include all additional story nodes as in your previous specification)
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
    </div>
  );
};

export default StoryScreen;
