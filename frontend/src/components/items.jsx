//Items.jsx
import React from 'react';
import useStore from '../store';


export const useItem = (item, character) => {
  const newStats = { ...character.stats };

  switch (item.name) {
    case "Health Potion":
      newStats.life += 50;
      break;
    case "Greater Health Potion":
      newStats.life += 100;
      break;
    case "Mana Potion":
      newStats.mana += 50;
      break;
    case "Sword of Valor":
      newStats.strength += 10;
      break;
      case "Stamina Potion":
      newStats.stamina += 50;
      break;
    // Add more cases for other items 
    default:
      console.warn("Item functionality not defined:", item.name);
  }

  useStore.setState({ character: { ...character, stats: newStats } });
  alert(`${item.name} used: ${item.effect}`);
};



const API_URL = import.meta.env.VITE_API_URL+"/api";

//  export const Inventory = [
//   // Consumables
//   { name: "Health Potion", effect: "Restores 50 HP" },
//   { name: "Greater Health Potion", effect: "Restores 100 HP" },
//   { name: "Mana Potion", effect: "Restores 50 MP" },
//   { name: "Greater Mana Potion", effect: "Restores 100 MP" },
//   { name: "Stamina Potion", effect: "Restores 50 Stamina" },
//   { name: "Elixir of Life", effect: "Fully restores health and removes debuffs" },
//   { name: "Energy Drink", effect: "Boosts agility by 10 for 10 minutes" },
//   { name: "Strength Tonic", effect: "Increases strength by 5 for 10 minutes" },
//   { name: "Mystic Brew", effect: "Temporarily increases mana regeneration" },
//   { name: "Phoenix Down", effect: "Revives a fallen ally with 50% HP" },

//   // Weapons
//   { name: "Sword of Valor", effect: "Increases strength by 10" },
//   { name: "Shadow Dagger", effect: "Increases critical hit chance by 15%" },
//   { name: "Flaming Longsword", effect: "Deals extra fire damage on attack" },
//   { name: "Staff of Arcane Power", effect: "Boosts magic attack by 20" },
//   { name: "Hammer of the Titans", effect: "Massive weapon that deals extra knockback" },
//   { name: "Bow of the Windwalker", effect: "Increases dexterity and agility by 15" },
//   { name: "Ice Spear", effect: "Deals frost damage and slows enemies" },
//   { name: "Doomblade", effect: "Has a chance to instantly slay weaker foes" },
//   { name: "Twin Daggers of Deception", effect: "Increases attack speed significantly" },

//   // Armor
//   { name: "Shield of Light", effect: "Increases defense by 10" },
//   { name: "Armor of Fortitude", effect: "Increases life by 20" },
//   { name: "Cloak of Stealth", effect: "Increases dexterity and evasion" },
//   { name: "Dragon Scale Armor", effect: "Grants fire resistance and extra defense" },
//   { name: "Plate of the Ancients", effect: "Grants 50 defense and reduces damage taken" },
//   { name: "Spirit Robes", effect: "Increases mana pool and magic resistance" },
//   { name: "Helmet of the Guardian", effect: "Reduces damage from critical hits" },

//   // Accessories
//   { name: "Ring of Wisdom", effect: "Enhances mana regeneration" },
//   { name: "Amulet of Strength", effect: "Increases strength by 5" },
//   { name: "Boots of Speed", effect: "Increases agility by 5" },
//   { name: "Bracers of Fortitude", effect: "Slightly increases overall defense" },
//   { name: "Earrings of the Phoenix", effect: "Revives you once per battle with 10% HP" },
//   { name: "Talisman of the Moon", effect: "Enhances magic power and mana recovery" },

//   // Special Artifacts
//   { name: "Orb of Eternal Fire", effect: "Grants immunity to fire damage" },
//   { name: "Stone of Resurrection", effect: "Revives you with full HP once per day" },
//   { name: "Scroll of Forbidden Magic", effect: "Allows casting of a powerful dark spell" },
//   { name: "Necklace of the Fallen", effect: "Enhances damage against undead enemies" },
//   { name: "Gauntlets of Thunder", effect: "Electrifies attacks, dealing extra lightning damage" },
//   { name: "Wings of the Seraph", effect: "Temporarily allows flight in battle" },
//   { name: "Eye of the Void", effect: "Reveals hidden enemies and secret doors" },
//   { name: "Dark Shard", effect: "Grants increased power but slowly drains health over time" },
//   { name: "Health Potion", effect: "Restores 50 HP" },
//   { name: "Mana Potion", effect: "Restores 50 MP" },
//   { name: "Stamina Potion", effect: "Restores 50 Stamina" },
//   { name: "Sword of Valor", effect: "Increases strength by 10" },
//   { name: "Shadow Dagger", effect: "Increases critical hit chance by 15%" }
// ];

// export default Inventory;