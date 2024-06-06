import { User } from "@supabase/supabase-js";
import { createStore } from "zustand/vanilla";
import { type StoreApi, useStore, create } from "zustand";

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
};

interface AddItemStore {
    title: string;
    description: string;
    images: string[];
    quantity: number;
    pickupInstructions: string;
    hasLocation: boolean;
    until_midnight: boolean;
    list_for: number;
    category: string;
    type: string;
    price: number;
    checkAllFields: (type: string, category: string) => boolean;
    checkBasicFields: () => boolean;
    clearStore: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
    user: null as User | null,
    setUser: (user: User) => set({ user }),
    logout: () => set({ user: null }),
}));

const addItemInitialState = {
    title: "",
    description: "",
    images: [],
    quantity: 1,
    pickupInstructions: "",
    hasLocation: false,
    until_midnight: false,
    list_for: 1,
    category: "",
    type: "",
    price: 0,
};

export const useAddItemStore = create<AddItemStore>((set, get) => ({
    ...addItemInitialState,
    checkBasicFields: () => {
        if (!get().title || !get().description || !get().images.length || !get().hasLocation || !get().pickupInstructions){
            return false;
        }
        return true;
    },
    checkAllFields: (type, category) => {
        set({ type, category });
        if (type === "food") {
            return get().checkBasicFields();
        }
        if (category === "sell") {
            return get().checkBasicFields() && get().price > 0;
        }
        return true;
    },
    clearStore: () => {
        set(addItemInitialState);
    },
}));