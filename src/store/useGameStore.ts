import { create } from 'zustand';
import type { ResearchStageId, Screen } from '../types/game';

type GameState = {
  currentScreen: Screen;
  coins: number;
  /** Nivel de investigación elegido en la rejilla (1–8), o null si aún no eligió. */
  selectedResearchStage: ResearchStageId | null;
  setScreen: (screen: Screen) => void;
  setSelectedResearchStage: (stage: ResearchStageId | null) => void;
  addCoin: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  currentScreen: 'intro',
  coins: 0,
  selectedResearchStage: null,
  setScreen: (screen) => set({ currentScreen: screen }),
  setSelectedResearchStage: (stage) => set({ selectedResearchStage: stage }),
  addCoin: () => set((state) => ({ coins: state.coins + 1 })),
}));
