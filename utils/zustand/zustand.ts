import { User } from "@supabase/supabase-js";
import { createStore } from "zustand/vanilla";
import { type StoreApi, useStore } from "zustand";

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
};

// const createUserStore = 

export const useUserStore = createStore <UserStore>()((set) => ({
    user: null as User | null,
    setUser: (user: User) => set({ user }),
    logout: () => set({ user: null }),
}));