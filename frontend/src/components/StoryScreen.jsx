import React, { useState } from "react";
import useStore from "../store";
import BattleScreen from "./BattleScreen";


const API_URL = import.meta.env.VITE_API_URL+"/api";

const storyData = [
  { id: 0, text: "You awaken in a cold, dimly lit dungeon. The air is thick with the scent of damp stone and decay. You hear faint whispers echoing in the corridors. Before you are three distinct paths.",
    choices: [
      { text: "Follow the torches on the left wall", next: 1 },
      { text: "Take the dark, unlit path straight ahead", next: 2 },
      { text: "Go right, where faint scratching noises can be heard", next: 3 },
    ]
  },
  { id: 1, text: "The torches flicker as you walk. Suddenly, a shadowy figure darts across your path.",
    choices: [
      { text: "Chase after it", next: 4 },
      { text: "Prepare for an ambush", next: 5 },
      { text: "Ignore it and continue", next: 6 },
    ]
  },
  { id: 2, text: "The unlit path leads into a chamber full of rusted cages. A pile of bones rattles as you step closer.",
    choices: [
      { text: "Search the bones for useful items", next: 7 },
      { text: "Keep moving quickly", next: 8 },
      { text: "Check inside one of the cages", next: 9 },
    ]
  },
  { id: 3, text: "You follow the scratching noises to a narrow passage where a pair of glowing eyes meet yours.",
    choices: [
      { text: "Attack the creature", next: "combat" },
      { text: "Try to communicate", next: 10 },
      { text: "Slowly back away", next: 11 },
    ]
  },
  { id: 4, text: "You chase after the shadow, only to be led into a trap. The ground crumbles beneath you!", 
    choices: [
      { text: "Try to grab the ledge", next: 12 },
      { text: "Brace for impact", next: 13 },
    ]
  },
  { id: 5, text: "You ready yourself. Just as expected, an ambusher lunges at you from the darkness!", 
    choices: [
      { text: "Defend and counterattack", next: "combat" },
      { text: "Dodge and flee", next: 14 },
    ]
  },
  { id: 6, text: "Ignoring the shadowy figure, you proceed into an open hall. A treasure chest lies ahead.",
    choices: [
      { text: "Open it", next: 15 },
      { text: "Examine it carefully for traps", next: 16 },
      { text: "Leave it and move on", next: 17 },
    ]
  },
  { id: 7, text: "Among the bones, you find an old rusted sword. It could be useful.",
    choices: [
      { text: "Take the sword", next: 18 },
      { text: "Leave it and move on", next: 8 },
    ]
  },
  { id: 8, text: "Moving quickly, you step onto a pressure plate. Arrows shoot from the walls!",
    choices: [
      { text: "Dodge the arrows", next: "combat" },
      { text: "Shield yourself", next: 19 },
    ]
  },
  { id: 9, text: "Inside the cage, you see a dying prisoner. He reaches out weakly.",
    choices: [
      { text: "Help him", next: 20 },
      { text: "Ignore him and move on", next: 21 },
    ]
  },
  { id: 10, text: "The glowing eyes blink. A small, frail creature steps into view, trembling.",
    choices: [
      { text: "Offer food", next: 22 },
      { text: "Attack it", next: "combat" },
    ]
  },
  { id: 11, text: "Backing away, you hear a deep growl. The creature gives chase!",
    choices: [
      { text: "Run!", next: 23 },
      { text: "Stand your ground", next: "combat" },
    ]
  },
  { id: 12, text: "You grab the ledge but struggle to hold on.", choices: [{ text: "Climb up", next: 24 }] },
  { id: 13, text: "Bracing for impact, you land hard, but survive. You are now in a deeper level of the dungeon.", choices: [{ text: "Explore the depths", next: 25 }] },
  { id: 14, text: "You escape but at the cost of some supplies.", choices: [{ text: "Continue on", next: 26 }] },
  { id: 15, text: "The chest contains a mysterious glowing dagger.", choices: [{ text: "Take it", next: 27 }] },
  { id: 16, text: "It's a mimic! It attacks!", choices: [{ text: "Fight the mimic", next: "combat" }] },
  { id: 17, text: "You leave the chest and continue exploring.", choices: [{ text: "Move forward", next: 28 }] },
  { id: 18, text: "You take the sword, feeling slightly safer.", choices: [{ text: "Move on", next: 8 }] },
  { id: 19, text: "Your shield takes the hit, saving you but getting damaged.", choices: [{ text: "Continue ahead", next: 29 }] },
  { id: 20, text: "The prisoner hands you a map before dying.", choices: [{ text: "Use the map", next: 30 }] },
  { id: 21, text: "You leave the prisoner and continue.", choices: [{ text: "Proceed", next: 31 }] },
  { id: 22, text: "The creature gives you a small amount of food.", choices: [{ text: "Continue", next: 32 }] },
  { id: 23, text: "You run away, frantically turning down various corridors trying to lose the creature.",
     choices: [
      { text: "Fight the creature", next: "combat" },
      { text: "Keep running", next: "combat" },
      { text: "Jump off nearby wall propelling yourself to a 10ft ledge", next: 24 },
    ] },
  { id: 24, text: "You climb up the ledge and continue.",
     choices: [
      { text: "Step away from the ledge and wait the creature out", next: 33 },
      { text: "Look around,and then you realize there is nowhere to run", next: "combat" },
      { text: "Jump down delivering a devestating blow", next: "combat" },
    ] },
  { id: 25, text: "You explore the deeper levels of the dungeon.", choices: [{ text: "Continue", next: 34 }] },
  { id: 26, text: "You escape and continue.", choices: [{ text: "Continue", next: 35 }] },
  { id: 27, text: "You take the dagger and continue.", choices: [{ text: "Continue", next: 36 }] }, 
  { id: 28, text: "You move forward and continue.", choices: [{ text: "Continue", next: 37 }] },
  { id: 29, text: "You continue.", choices: [{ text: "Continue", next: 38 }] },
  { id: 30, text: "You use the map and continue.", choices: [{ text: "Continue", next: 39 }] },
  { id: 31, text: "You walk away from the prisoner turning your backand then you hear the cage squeak as if the door opened.",
     choices: [
      { text: "Pause and ready your weapon", next: 40 },
      { text: "Turn around and confront the prisoner", next: 41 },
      { text: "Ignore the sound and continue walking away", next: 42 }
    ] },
  { id: 32, text: "You continue.", choices: [{ text: "Continue", next: 41 }] },
  { id: 33, text: "The sounds of the creature gegin to multiplyand you start to hear scratching underneath where you hide", choices: [{ text: "Continue", next: 42 }] },
  { id: 34, text: "You continue.", choices: [{ text: "Continue", next: 43 }] },
  { id: 35, text: "You continue.", choices: [{ text: "Continue", next: 44 }] },
  { id: 36, text: "You continue.", choices: [{ text: "Continue", next: 45 }] },
  { id: 37, text: "You continue.", choices: [{ text: "Continue", next: 46 }] },
  { id: 38, text: "You continue.", choices: [{ text: "Continue", next: 47 }] },
  { id: 39, text: "You continue.", choices: [{ text: "Continue", next: 48 }] },
  { id: 40, text: "You continue.", choices: [{ text: "Continue", next: 49 }] },
  { id: 41, text: "You continue.", choices: [{ text: "Continue", next: 50 }] },
  { id: 42, text: "You continue.", choices: [{ text: "Continue", next: 51 }] },
  { id: 43, text: "You continue.", choices: [{ text: "Continue", next: 52 }] },
  { id: 44, text: "You continue.", choices: [{ text: "Continue", next: 53 }] },
  { id: 45, text: "You continue.", choices: [{ text: "Continue", next: 54 }] },
  { id: 46, text: "You continue.", choices: [{ text: "Continue", next: 55 }] },
  { id: 47, text: "You continue.", choices: [{ text: "Continue", next: 56 }] },
  { id: 48, text: "You continue.", choices: [{ text: "Continue", next: 57 }] },
  { id: 49, text: "You continue.", choices: [{ text: "Continue", next: 58 }] },
  { id: 50, text: "You continue.",
     choices: [
      { text: "Exit the dungeon", next: 51 },
      { text: "Exit the dungeon", next: 52 },
      { text: "Exit the dungeon", next: 53 }
     ]

     },
];


const StoryScreen = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [inBattle, setInBattle] = useState(false);

  const handleChoice = (choice) => {
    if (choice.next === "combat") {
      setInBattle(true);
    } else {
      setCurrentScene(choice.next);
    }
  };

  if (inBattle) return <BattleScreen onBattleEnd={() => setInBattle(false)} />;

  const node = storyData.find(n => n.id === currentScene);
  if (!node) return <div>No story available.</div>;

  return (
    <div className="story-screen">
      <h3>Story</h3>
      <p>{node.text}</p>
      {node.choices.map((choice, idx) => (
        <button key={idx} onClick={() => handleChoice(choice)}>
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default StoryScreen;
