// store.js
import {create} from 'zustand';

const API_URL = "http://localhost:8081/api";

const useStore = create((set) => ({
  screen: 'login',          // 'login' | 'customization' | 'story' | 'battle'
  user: null,               // Username string
  character: null,          // Character object
  currentScene: 0,          // Starting story node
  defeats: 0,               // Count of battle defeats
  experience: 0,
  level: 1,
  setScreen: (screen) => set({ screen }),
  setUser: (user) => set({ user }),
  setCharacter: (character) => set({ character }),
  setCurrentScene: (scene) => set({ currentScene: scene }),
  incrementDefeats: () => set(state => ({ defeats: state.defeats + 1 })),
  addExperience: (exp) => set(state => ({ experience: state.experience + exp })),
  levelUp: () => set(state => ({ level: state.level + 1 })),
}));

export default useStore;
