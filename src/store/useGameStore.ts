import { create } from 'zustand';
import type { Screen } from '../types/game';

type GameState = {
  currentScreen: Screen;
  coins: number;
  setScreen: (screen: Screen) => void;
  addCoin: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  currentScreen: 'intro',
  coins: 0,
  setScreen: (screen) => set({ currentScreen: screen }),
  addCoin: () => set((state) => ({ coins: state.coins + 1 })),
}));
