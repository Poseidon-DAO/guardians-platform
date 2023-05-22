import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UiState {
  collectionLayout: "table" | "column" | "grid";
  setCollectionLayout: (collectionLayout: UiState["collectionLayout"]) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  collectionLayout: "grid",
  setCollectionLayout: (newLayout: UiState["collectionLayout"]) => {
    return set(() => ({ collectionLayout: newLayout }));
  },
}));
