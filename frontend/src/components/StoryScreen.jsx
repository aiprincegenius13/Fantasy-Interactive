// StoryScreen.jsx
import React from "react";

// Full story data – generated from your previous story.
// This array contains all the narrative nodes and their choices.
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
  {
    id: 3,
    text: "A familiar chill runs down your spine as you pass through the GREEN portal. (Green count: 3)",
    choices: [
      { text: "Enter the GREEN portal", next: 4 },
      { text: "Switch to BLUE", next: 20 },
      { text: "Switch to RED", next: 40 }
    ]
  },
  {
    id: 4,
    text: "The green light intensifies. The dungeon seems less suffocating. (Green count: 4)",
    choices: [
      { text: "Enter the GREEN portal", next: 5 },
      { text: "Try BLUE instead", next: 20 },
      { text: "Try RED instead", next: 40 }
    ]
  },
  {
    id: 5,
    text: "Each step through the GREEN portal fills you with hope. (Green count: 5)",
    choices: [
      { text: "Enter the GREEN portal", next: 6 },
      { text: "Switch to BLUE", next: 20 },
      { text: "Switch to RED", next: 40 }
    ]
  },
  {
    id: 6,
    text: "The corridor shifts once more. The portal’s green radiance seems almost to pulse. (Green count: 6)",
    choices: [
      { text: "Step into the GREEN portal", next: 7 },
      { text: "Try BLUE", next: 20 },
      { text: "Try RED", next: 40 }
    ]
  },
  {
    id: 7,
    text: "You feel the promise of escape drawing nearer as you pass through the GREEN portal. (Green count: 7)",
    choices: [
      { text: "Enter the GREEN portal", next: 8 },
      { text: "Switch to BLUE", next: 20 },
      { text: "Switch to RED", next: 40 }
    ]
  },
  {
    id: 8,
    text: "The dungeon corridor recurs, yet the green light grows warmer. (Green count: 8)",
    choices: [
      { text: "Enter the GREEN portal", next: 9 },
      { text: "Switch to BLUE", next: 20 },
      { text: "Switch to RED", next: 40 }
    ]
  },
  {
    id: 9,
    text: "Almost there—each step through the GREEN portal fills you with renewed hope. (Green count: 9)",
    choices: [
      { text: "Step into the GREEN portal for the final time", next: 10 },
      { text: "Switch to BLUE", next: 20 },
      { text: "Switch to RED", next: 40 }
    ]
  },
  {
    id: 10,
    text: "As you step through the GREEN portal for the tenth time, the dungeon melts away. You emerge into a strange new world bathed in soft light. Two moons hang in the sky, and the landscape is breathtaking—a land of alien beauty awaits you.",
    choices: [
      { text: "Explore the new world", next: 11 },
      { text: "Rest and marvel at the scenery", next: 12 },
      { text: "Search for local inhabitants", next: 13 }
    ]
  },
  // BLUE PORTAL branch – Trials, puzzles, and combat.
  {
    id: 20,
    text: "You step into the BLUE portal. The air turns cool and misty as you enter a corridor where echoes of distant battle cries resonate.",
    choices: [
      { text: "Proceed cautiously", next: 21 },
      { text: "Charge into the mist", next: 22 },
      { text: "Return to the dungeon entrance", next: 0 }
    ]
  },
  {
    id: 21,
    text: "The blue corridor is alive with shifting shadows. You sense movement along the walls.",
    choices: [
      { text: "Investigate the movements", next: 23 },
      { text: "Hide and observe", next: 24 },
      { text: "Prepare for combat", next: "combat" }
    ]
  },
  {
    id: 22,
    text: "You charge ahead and are suddenly ambushed by a spectral warrior! Prepare for combat!",
    choices: [
      { text: "Fight aggressively", next: "combat" },
      { text: "Try to flee", next: 21 },
      { text: "Attempt to negotiate", next: 25 }
    ]
  },
  {
    id: 23,
    text: "Following the movements, you discover an ancient puzzle carved into the cold stone.",
    choices: [
      { text: "Attempt to solve the puzzle", next: 25 },
      { text: "Ignore the puzzle and press forward", next: 26 },
      { text: "Switch to the RED portal", next: 40 }
    ]
  },
  {
    id: 24,
    text: "You hide in the shadows, waiting as the corridor’s tension mounts.",
    choices: [
      { text: "Step out and proceed cautiously", next: 23 },
      { text: "Switch to the GREEN portal", next: 1 },
      { text: "Return to the dungeon entrance", next: 0 }
    ]
  },
  {
    id: 25,
    text: "Your attempt at solving the puzzle reveals a hidden passage. But as you enter, a trap is triggered!",
    choices: [
      { text: "Dodge the trap (Combat)", next: "combat" },
      { text: "Try to disable the trap", next: 26 },
      { text: "Retreat back", next: 21 }
    ]
  },
  {
    id: 26,
    text: "You forge ahead through the hidden passage, only to encounter a fearsome foe emerging from the mist!",
    choices: [
      { text: "Engage in combat", next: "combat" },
      { text: "Attempt to hide", next: 21 },
      { text: "Retreat to the blue corridor", next: 21 }
    ]
  },
  // RED PORTAL branch – Traps, puzzles, and fiery challenges.
  {
    id: 40,
    text: "You step into the RED portal. The atmosphere becomes oppressively hot; flames lick the walls and a sulfurous smell fills your nostrils.",
    choices: [
      { text: "Proceed through the flames", next: 41 },
      { text: "Search for a safe path", next: 42 },
      { text: "Return to the dungeon entrance", next: 0 }
    ]
  },
  {
    id: 41,
    text: "As you advance, the flames intensify and a hidden trap is triggered! Burning projectiles fly toward you!",
    choices: [
      { text: "Dodge and fight the trap (Combat)", next: "combat" },
      { text: "Take cover behind a fallen pillar", next: 42 },
      { text: "Scream for help", next: 43 }
    ]
  },
  {
    id: 42,
    text: "Carefully, you navigate the fiery labyrinth and notice cryptic inscriptions on the wall.",
    choices: [
      { text: "Attempt to decipher the inscriptions", next: 43 },
      { text: "Ignore them and push forward", next: 44 },
      { text: "Switch to the BLUE portal", next: 20 }
    ]
  },
  {
    id: 43,
    text: "Deciphering the inscriptions reveals a lever that might deactivate the traps. You pull the lever and the flames subside slightly.",
    choices: [
      { text: "Press onward", next: 44 },
      { text: "Return to the RED portal entrance", next: 40 },
      { text: "Switch to the GREEN portal", next: 1 }
    ]
  },
  {
    id: 44,
    text: "Just as you think the danger has passed, a fire elemental bursts forth from the flames!",
    choices: [
      { text: "Engage in combat", next: "combat" },
      { text: "Attempt to flee", next: 42 },
      { text: "Hide behind debris", next: 43 }
    ]
  },
  // New World – After escaping the dungeon (from GREEN branch node 10)
  {
    id: 11,
    text: "You explore the strange new world beyond the dungeon. The sky glows with two luminous moons and the landscape is filled with alien flora and surreal vistas.",
    choices: [
      { text: "Venture toward a distant, sparkling lake", next: 12 },
      { text: "Climb a hill for a better view", next: 13 },
      { text: "Head toward a cluster of unusual structures", next: 14 }
    ]
  },
  {
    id: 12,
    text: "At the lake, a serene water spirit appears. It offers you a quest to cleanse the lake of a mysterious toxin.",
    choices: [
      { text: "Accept the quest", next: 15 },
      { text: "Decline politely", next: 16 },
      { text: "Ask for more information", next: 17 }
    ]
  },
  {
    id: 13,
    text: "From atop the hill, you behold an ancient observatory with inscriptions about the two moons. A reclusive scholar greets you.",
    choices: [
      { text: "Speak with the scholar", next: 18 },
      { text: "Ignore the scholar and continue exploring", next: 16 },
      { text: "Rest and absorb the view", next: 16 }
    ]
  },
  {
    id: 14,
    text: "You discover ruins of a lost civilization. A local inhabitant emerges and offers you a quest to retrieve a sacred relic.",
    choices: [
      { text: "Accept the quest", next: 19 },
      { text: "Decline and explore further", next: 16 },
      { text: "Ask for details about the relic", next: 20 }
    ]
  },
  {
    id: 15,
    text: "You accept the water spirit's quest and set off into the forest surrounding the lake, determined to cleanse it.",
    choices: [
      { text: "Venture into the dense forest", next: "combat" },
      { text: "Seek allies among the local creatures", next: 22 },
      { text: "Prepare for the toxic challenge", next: "combat" }
    ]
  },
  {
    id: 16,
    text: "Choosing not to take a quest, you wander the new land, marveling at its wonders and mysteries.",
    choices: [
      { text: "Explore a mystical forest", next: 23 },
      { text: "Rest near a shimmering river", next: 24 },
      { text: "Head toward a distant mountain", next: 25 }
    ]
  },
  {
    id: 17,
    text: "The water spirit explains that a toxic spill from an ancient source has polluted the lake. Only a brave soul can restore its purity.",
    choices: [
      { text: "Accept the quest now", next: 15 },
      { text: "Decline and continue exploring", next: 16 },
      { text: "Request a magical boon for the task", next: "combat" }
    ]
  },
  {
    id: 18,
    text: "The scholar reveals a prophecy about the twin moons and hints that you may be the chosen one. He offers you ancient knowledge in exchange for a favor.",
    choices: [
      { text: "Agree to the favor", next: "combat" },
      { text: "Ask for more details", next: 16 },
      { text: "Decline his offer", next: 16 }
    ]
  },
  {
    id: 19,
    text: "The local inhabitant tells you of a sacred relic hidden in ancient ruins beyond the valley. Retrieving it may change the fate of this world.",
    choices: [
      { text: "Accept the quest and head to the ruins", next: "combat" },
      { text: "Decline and continue exploring", next: 16 },
      { text: "Ask for further details", next: 20 }
    ]
  },
  {
    id: 20,
    text: "The inhabitant provides detailed hints about the relic’s location and warns of dangerous guardians along the way.",
    choices: [
      { text: "Set out toward the ruins", next: "combat" },
      { text: "Return to the village for assistance", next: 22 },
      { text: "Decline and explore another region", next: 16 }
    ]
  },
  {
    id: 21,
    text: "Deep in the mystical forest, you encounter strange glowing trees and hostile creatures guarding ancient secrets.",
    choices: [
      { text: "Engage the forest creature in combat", next: "combat" },
      { text: "Follow a hidden path deeper into the forest", next: 23 },
      { text: "Return to the lake", next: 12 }
    ]
  },
  {
    id: 22,
    text: "A friendly, alien inhabitant approaches and offers to guide you through this wondrous land.",
    choices: [
      { text: "Accept the guide's help", next: 23 },
      { text: "Ask the guide for more information", next: 24 },
      { text: "Thank the guide and part ways", next: 24 }
    ]
  },
  {
    id: 23,
    text: "You venture deeper into the new world, where each step reveals secrets of ancient magic and perilous beauty.",
    choices: [
      { text: "Examine mysterious ruins", next: "combat" },
      { text: "Collect magical artifacts", next: 24 },
      { text: "Venture further into unknown lands", next: 25 }
    ]
  },
  {
    id: 24,
    text: "Beside a shimmering river, you take time to rest. The soothing sounds rejuvenate your spirit.",
    choices: [
      { text: "Meditate by the river", next: 25 },
      { text: "Gather resources", next: 25 },
      { text: "Continue exploring the land", next: 26 }
    ]
  },
  {
    id: 25,
    text: "At the foot of a majestic mountain, the twin moons cast an ethereal glow. The landscape is both alien and awe-inspiring.",
    choices: [
      { text: "Climb the mountain for a panoramic view", next: 26 },
      { text: "Search for ancient inscriptions on the rocks", next: "combat" },
      { text: "Descend to explore the foothills", next: 26 }
    ]
  },
  {
    id: 26,
    text: "Your journey in this strange new world continues. Diverse landscapes and hidden dangers lie ahead.",
    choices: [
      { text: "Venture toward a bustling settlement", next: 27 },
      { text: "Head into a neighboring enchanted forest", next: 28 },
      { text: "Wander an open plain under the twin moons", next: 29 }
    ]
  },
  {
    id: 27,
    text: "In a bustling settlement, locals greet you with curiosity. A merchant offers you a quest to retrieve a rare ingredient.",
    choices: [
      { text: "Accept the quest", next: "combat" },
      { text: "Decline and explore the settlement", next: 28 },
      { text: "Ask for more information", next: 28 }
    ]
  },
  {
    id: 28,
    text: "In the enchanted forest, an enigmatic guide offers you wisdom and a quest to aid their people.",
    choices: [
      { text: "Accept the guide's quest", next: "combat" },
      { text: "Decline and continue on your way", next: 29 },
      { text: "Ask for directions to a nearby village", next: 29 }
    ]
  },
  {
    id: 29,
    text: "Wandering the open plain under the twin moons, you feel both isolated and inspired by the otherworldly beauty.",
    choices: [
      { text: "Sit and meditate under the moons", next: 30 },
      { text: "Search the plains for signs of life", next: "combat" },
      { text: "Set up camp and rest", next: 30 }
    ]
  },
  {
    id: 30,
    text: "As dawn approaches, you decide your next move in this land of wonder and danger.",
    choices: [
      { text: "Venture toward a distant mountain range", next: 31 },
      { text: "Explore a nearby enchanted forest", next: 32 },
      { text: "Return to the settlement for more quests", next: 27 }
    ]
  },
  {
    id: 31,
    text: "In the mountain range, you encounter a tribe of alien warriors guarding ancient secrets.",
    choices: [
      { text: "Engage in combat", next: "combat" },
      { text: "Attempt peaceful communication", next: 32 },
      { text: "Retreat and explore elsewhere", next: 30 }
    ]
  },
  {
    id: 32,
    text: "Within the enchanted forest, a wise elder offers you a quest to recover a lost relic.",
    choices: [
      { text: "Accept the quest", next: "combat" },
      { text: "Decline and continue exploring", next: 33 },
      { text: "Ask for more details", next: 33 }
    ]
  },
  {
    id: 33,
    text: "Your journey continues as you explore the diverse realms of this strange new world.",
    choices: [
      { text: "Head back to the settlement", next: 27 },
      { text: "Venture into a neighboring valley", next: 34 },
      { text: "Search for hidden treasures", next: "combat" }
    ]
  },
  {
    id: 34,
    text: "In the neighboring valley, a mysterious figure offers you a quest of great importance.",
    choices: [
      { text: "Accept the quest", next: "combat" },
      { text: "Decline and wander further", next: 35 },
      { text: "Request more information", next: 35 }
    ]
  },
  {
    id: 35,
    text: "The figure reveals the quest involves recovering a magical artifact from forgotten ruins.",
    choices: [
      { text: "Set out for the ruins", next: "combat" },
      { text: "Return to the valley center", next: 34 },
      { text: "Seek assistance from the locals", next: 36 }
    ]
  },
  {
    id: 36,
    text: "With local help, you prepare to face the challenges within the ruin.",
    choices: [
      { text: "Enter the ruin", next: "combat" },
      { text: "Scout the area first", next: 37 },
      { text: "Return to the settlement", next: 27 }
    ]
  },
  {
    id: 37,
    text: "Scouting the area, you find signs of past adventurers and hidden dangers.",
    choices: [
      { text: "Investigate the signs", next: "combat" },
      { text: "Avoid the danger and return", next: 36 },
      { text: "Head back to the valley", next: 34 }
    ]
  },
  {
    id: 38,
    text: "Your adventures have led you to unexpected challenges. The journey is arduous but filled with wonder.",
    choices: [
      { text: "Reflect and rest", next: 39 },
      { text: "Push forward", next: 40 },
      { text: "Return to the settlement", next: 27 }
    ]
  },
  {
    id: 39,
    text: "Taking a moment to rest, you recover and gather strength for what lies ahead.",
    choices: [
      { text: "Set out again", next: 40 },
      { text: "Explore the surroundings", next: 38 },
      { text: "Return to the settlement", next: 27 }
    ]
  },
  {
    id: 40,
    text: "A final challenge awaits at the edge of the known world.",
    choices: [
      { text: "Face the challenge head-on", next: "combat" },
      { text: "Seek an alternative path", next: 41 },
      { text: "Return to the settlement", next: 27 }
    ]
  },
  {
    id: 41,
    text: "You discover an alternative path winding through breathtaking landscapes and mysterious ruins.",
    choices: [
      { text: "Explore the alternative path", next: 42 },
      { text: "Return to the challenge", next: 40 },
      { text: "Set up camp", next: 42 }
    ]
  },
  {
    id: 42,
    text: "Your journey in this strange new world continues with endless adventures.",
    choices: [
      { text: "Venture deeper into unknown lands", next: 43 },
      { text: "Return to a familiar settlement", next: 44 },
      { text: "Take a moment to reflect", next: 45 }
    ]
  },
  {
    id: 43,
    text: "In unknown lands, you face trials that test your resolve.",
    choices: [
      { text: "Confront the challenges", next: "combat" },
      { text: "Seek guidance from a local sage", next: 44 },
      { text: "Retreat and regroup", next: 42 }
    ]
  },
  {
    id: 44,
    text: "Returning to the settlement, you share your tales and prepare for new quests.",
    choices: [
      { text: "Accept a new quest", next: "combat" },
      { text: "Decline and rest", next: 45 },
      { text: "Venture out again", next: 42 }
    ]
  },
  {
    id: 45,
    text: "In a moment of quiet reflection, you gather strength for the adventures to come.",
    choices: [
      { text: "Venture forth into the wild", next: 46 },
      { text: "Return to the settlement", next: 44 },
      { text: "Contemplate your journey", next: 45 }
    ]
  },
  {
    id: 46,
    text: "Your journey has been long and challenging, yet you remain undaunted.",
    choices: [
      { text: "Embrace the call of adventure", next: 47 },
      { text: "Return home with newfound wisdom", next: 48 },
      { text: "Seek one final quest", next: "combat" }
    ]
  },
  {
    id: 47,
    text: "You continue your adventure, your legend growing with every trial.",
    choices: [
      { text: "Explore a distant realm", next: 49 },
      { text: "Plan your next move", next: 48 },
      { text: "Accept a mysterious quest", next: "combat" }
    ]
  },
  {
    id: 48,
    text: "Returning home, you reflect on the journey and the lessons learned.",
    choices: [
      { text: "Restart your adventure", next: 0 },
      { text: "Exit the game", next: "exit" },
      { text: "Review your final achievements", next: 50 }
    ]
  },
  {
    id: 49,
    text: "In a distant realm, you encounter wonders and challenges beyond imagination.",
    choices: [
      { text: "Venture into the unknown", next: "combat" },
      { text: "Explore a thriving city", next: 48 },
      { text: "Return to your roots", next: 48 }
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
