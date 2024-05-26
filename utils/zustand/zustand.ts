import { User } from "@supabase/supabase-js";
import { createStore } from "zustand/vanilla";
import { type StoreApi, useStore, create } from "zustand";

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
    user: null as User | null,
    setUser: (user: User) => set({ user }),
    logout: () => set({ user: null }),
}));