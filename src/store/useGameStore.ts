import { create } from 'zustand';

type GameState = {
  currentScreen: string;
  coins: number;
  setScreen: (screen: string) => void;
  addCoin: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  currentScreen: 'intro',
  coins: 0,
  setScreen: (screen) => set({ currentScreen: screen }),
  addCoin: () => set((state) => ({ coins: state.coins + 1 })),
}));
