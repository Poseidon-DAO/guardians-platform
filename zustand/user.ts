import { create } from "zustand";

import { type User } from "@/lib/client";

export const useUserStore = create<{
  user: User | null;
  setUser: (newUser: User) => void;
}>()((set) => ({
  user: null,
  setUser: (newUser: User) => {
    return set(() => ({ user: newUser }));
  },
}));
