import React from 'react';
import useStore from '../store';

const API_URL = "http://localhost:8081/api";

//Story Structure
const storyData = [
  {
    id: 0,
    text: "You awaken with blurred vision, unable to move. As your vision clears, you realize you are in a dungeon of some sort, chained to a wall. The nearby torches illuminate the darkness, revealing other occupants of the dungeon—some deceased, while those still alive are in states much like your own or even worse.",
    choices: [
      { text: "Yell for help!", next: 1 },
      { text: "Remain silent and try to get free from your restraints", next: 2 },
      { text: "Examine your surroundings for clues", next: 8}
    ]
  },
  {
    id: 1,
    text: "The yelling attracts the guards holding you captive. They burst into the chamber and proceed to beat you with a club. The brutal assault fractures your arms, legs, and stomach, shattering your limbs and breaking many of your ribs. The pain is unbearable—you eventually throw up blood and pass out.",
    choices: [
      { text: "Wake Up", next: 3 },
      { text: "Succumb to unconsciousness”", next: 50 },
      { text: "Will yourself to stay conscious", next: 3 }
    ]
  },
  {
    id: 2,
    text: "You realize the restraints are loose. With careful effort, you pull your hands free, though you end up breaking both of your thumbs. While your legs are more difficult to release, you manage to free yourself completely.",
    choices: [
      { text: "Help prisoners", next: 4 },
      { text: "Run for it", next: 5 },
      { text: "Hide and wait for an opportunity", next: 9 }
    ]
  },
  {
    id: 3,
    text: "You slowly regain consciousness as the searing pain and blurred memories fade. The grim reality of the dungeon sinks in: you are battered, but still alive. Determination flickers within you as you consider your next move.",
    choices: [
      { text: "Assess your injuries and search for a weak spot", next: 10 },
      { text: "Attempt to free yourself from your chains again", next: 2 },
      { text: "Call out softly to see if anyone else is awake", next: 11 } 
    ]
  },
  {
    id: 4,
    text: "You look for something to free the prisoners and notice a nearby guard sleeping loudly. Your eyes catch a brick within reach—an opportunity to strike back against your captors.",
    choices: [
      { text: "Grab brick and assault the guard", next: 6 },
      { text: "Grab a brick and break another prisoner's shackles", next: 7 },
      { text: "Quietly search for a hidden key or tool”", next: 12 }
    ]
  },
  {
    id: 5,
    text: "Determined to secure your freedom, you dash through the dungeon corridors. Your broken thumbs throb with each movement while the sound of pursuing guards grows louder behind you."
,
    choices: [
      { text: "Turn left into a narrow passage", next: 13 },
      { text: "Turn right toward distant torchlight”", next: 14 },
      { text: "Hide in a side alcove to catch your breathd", next: 15 }
    ]
  },
  {
    id: 6,
    text: "Armed with the brick, you charge at the slumbering guard. The attack catches him off guard, and a violent struggle ensues. Prepare for combat!"
,
    choices: [
      { text: "Fight aggressively", next: "combat" },
      { text: "Aim for a disabling blow", next: "combat" },
      { text: "Attempt a defensive maneuver and counterattack", next: "combat" }
    ]
  },
  {
    id: 7,
    text: "Using the brick, you force open the shackles of a fellow prisoner. The freed prisoner nods in gratitude and appears ready to fight by your side",
    choices: [
      { text: "Encourage the prisoner to join you in a group escape", next: 18 },
      { text: "Offer the prisoner some of your rations and plan a coordinated breakout”", next: 19 },
      { text: "Let the prisoner go ahead while you continue alone", next:  20}
    ]
  },
  {
    id: 8,
    text: "You carefully inspect your surroundings and notice subtle, faded markings on the dungeon wall. The symbols hint at secret passages or hidden keys.",
    choices: [
      { text: "Follow the markings along the wall", next: 21 },
      { text: "Call out to see if anyone else noticed these signs", next: 22 },
      { text: "Jot down the symbols and plan to decipher them later", next: 23 }
    ]
  },
  {
    id: 9,
    text: "Deciding that stealth is your ally, you slip into a dark corner and hide as chaos unfolds around you, waiting for the right moment to act.",
    choices: [
      { text: "Peek out to observe the movements of the guards", next: 24 },
      { text: "Stay hidden and conserve your strength", next: 25 },
      { text: "Make a quiet dash to a different part of the dungeon”", next: 26 }
    ]
  },
  {
    id: 10,
    text: "In the dim light, you examine your battered body. Despite the pain, you notice weak points in the chains. There might be a way to break free permanently.",
    choices: [
      { text: "Search for a hidden tool among the rubble", next: 27 },
      { text: "Focus on the weak chain links and attempt to break them", next: 28 },
      { text: "Call for assistance from any other prisoners nearby", next: 29 }
    ]
  },
  {
    id: 11,
    text: "Your soft plea echoes through the corridor. A faint voice responds from the darkness—a sign that you are not alone in this suffering",
    choices: [
      { text: "Follow the sound of the voice", next: 30 },
      { text: "Ignore it, suspecting a trap”", next: 31 },
      { text: "Yell louder to gather more attention", next: 32 }
    ]
  },
  {
    id: 12,
    text: "Your cautious search reveals a small, ornate key hidden beneath a loose stone. This key might unlock more than just your chains.",
    choices: [
      { text: "Use the key on your shackles", next: 33 },
      { text: "Try the key on a nearby prisoner's lock", next: 34 },
      { text: "Hide the key for future use and continue exploring”", next: 35 }
    ]
  },  {
    id: 13,
    text: "You dart into a narrow, winding passage. The claustrophobic corridor is lined with damp stone and the distant sound of dripping water hints at lurking dangers",
    choices: [
      { text: "Proceed cautiously, listening for traps", next: 36 },
      { text: "Break into a run, trusting your instincts", next: 37 },
      { text: "Stop to inspect suspicious markings on the walls", next: 38 }
    ]
  },
  {
    id: 14,
    text: "You race toward the distant torchlight, hoping it signals an exit. The corridor widens as you approach, yet the flickering flames cast unpredictable shadows",
    choices: [
      { text: "Follow the torchlight, staying in the bright areas", next: "combat" },
      { text: "Venture into the darker gaps between the torches", next: 40 },
      { text: "Quickly hide in the shadows to avoid detection", next: 41 }
    ]
  },
  {
    id: 15,
    text: "You take a moment in a small alcove to catch your breath. Your heart races while distant sounds of pursuit remind you that danger is never far.",
    choices: [
      { text: "Regain your strength and plan your next move", next: 42 },
      { text: "Scout the area for other prisoners", next: 43 },
      { text: "Fashion a makeshift weapon from nearby debris", next: 44 }
    ]
  },
  {
    id: 16,
    text: "With a battle cry, you charge at the Dungeon Guard with your brick raised high.",
    choices: [
      { text: "Attack with full force", next: "combat" },
      { text: "Aim for a disabling blow", next:"combat"  },
      { text: "Defend and counterattack", next: "combat" }
    ]
  },
  {
    id: 17,
    text: "You attempt to subdue the guard non-lethally, aiming to knock him out without causing fatal harm.",
    choices: [
      { text: "Use a precise strike to incapacitate him", next: 45 },
      { text: "Restrain him quickly”", next:45  },
      { text: "Intimidate him into submission", next: 45 }
    ]
  },
  {
    id: 18,
    text: "The freed prisoner joins your side. Together you now have a better chance against your captors",
    choices: [
      { text: "Lead the prisoner to a secret passage", next: 46 },
      { text: "Search for more allies among the prisoners", next: 47 },
      { text: "Plan a coordinated attack on a nearby guard station", next: 48 }
    ]
  },
  {
    id: 19,
    text: "Sharing your meager rations and a glimmer of hope, you and the freed prisoner plan a group escape",
    choices: [
      { text: "Organize a distraction to lure guards away", next:  49},
      { text: "“Prepare a stealthy break-out from the cell block” ", next: 46 },
      { text: " “Gather improvised weapons for an uprising” ", next: 48 }
    ]
  },
  {
    id: 20,
    text: "Determined to make it on your own, you slip away into the labyrinthine corridors, resolved to find freedom at any cost",
    choices: [
      { text: "Follow a dimly lit corridor", next: 36 },
      { text: "Climb a crumbling wall toward a hidden exit", next: 37 },
      { text: "Hide in a forgotten storage room and plan your next move", next: 42 }
    ]
  },
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
