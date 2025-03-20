// create.jsx
import { create } from 'zustand';
import { baseStats } from './Levels';

const useGameStore = create(set => ({
  user: null,
  character: null,
  level: 1,
  experience: 0,
  inventory: [],
  setUser: user => set({ user }),
  createCharacter: (alignment, charClass, specialAbility, tendency) => set({
    character: {
      alignment,
      class: charClass,
      stats: baseStats[charClass],
      specialAbility,
      battleTendency: tendency
    },
    level: 1,
    experience: 0,
    inventory: []
  }),
  resetGame: () => set({
    character: null,
    level: 1,
    experience: 0,
    inventory: []
  }),
}));

export default useGameStore;
