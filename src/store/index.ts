import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  favoritesIds: number[];
};

type Action = {
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
};

export const useStore = create<State & Action>()(
  persist(
    (set) => ({
      favoritesIds: [],
      addFavorite: (id: number) =>
        set((state) => ({ favoritesIds: [...state.favoritesIds, id] })),
      removeFavorite: (id: number) =>
        set((state) => ({
          favoritesIds: state.favoritesIds.filter((item) => item !== id),
        })),
    }),
    {
      name: "superheros-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
