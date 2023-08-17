import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  favoritesIds: number[];
};

type Action = {
  handleFavorites: (id: number) => void;
};

export const useStore = create<State & Action>()(
  persist(
    (set, get) => ({
      favoritesIds: [],
      handleFavorites: (id: number) => {
        const { favoritesIds } = get();
        if (!favoritesIds.includes(id)) {
          return set((state) => ({
            favoritesIds: [...state.favoritesIds, id],
          }));
        }
        return set((state) => ({
          favoritesIds: state.favoritesIds.filter((item) => item !== id),
        }));
      },
    }),
    {
      name: "superheros-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
