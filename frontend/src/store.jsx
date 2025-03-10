import { create } from 'zustand';

const useStore = create((set, get) => ({
  screen: 'login', // 'login', 'customization', 'game'
  user: null,
  character: null,
  currentScene: 0,
  experience: 0,
  level: 1,
  specialAbilities: [],
  // Functions to update state
  setUser: (user) => set({ user }),
  setCharacter: (character) => set({ character }),
  setScreen: (screen) => set({ screen }),
  setCurrentScene: (scene) => set({ currentScene: scene }),
  addExperience: (exp) => set({ experience: get().experience + exp }),
  levelUp: () => {
    const currentLevel = get().level;
    set(state => {
      const updatedStats = { ...state.character.stats };
      for (let key in updatedStats) {
        updatedStats[key] = Math.round(updatedStats[key] * 1.1);
      }
      return { 
        level: currentLevel + 1,
        character: { ...state.character, stats: updatedStats }
      };
    });
  },
  addAbility: (ability) => set(state => ({
    specialAbilities: state.specialAbilities.includes(ability) 
      ? state.specialAbilities 
      : [...state.specialAbilities, ability]
  })),
  setGameState: (gameState) => set(() => gameState)
}));

export default useStore;
