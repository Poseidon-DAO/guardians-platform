import { LayoutTypes } from "@/components/collection/view-toggle/ViewToggle";
import { create } from "zustand";

export interface UiState {
  collectionLayout: LayoutTypes;
  setCollectionLayout: (collectionLayout: UiState["collectionLayout"]) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  collectionLayout: "grid",
  setCollectionLayout: (newLayout: UiState["collectionLayout"]) => {
    return set(() => ({ collectionLayout: newLayout }));
  },
}));
