import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  favorites: number[];
};

type Action = {
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
};

export const useStore = create<State & Action>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (id: number) =>
        set((state) => ({ favorites: [...state.favorites, id] })),
      removeFavorite: (id: number) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item !== id),
        })),
    }),
    {
      name: "superheros-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
