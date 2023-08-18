import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  favoritesIds: number[];
  isCollapsibleOpen: boolean;
};

type Action = {
  handleFavorites: (id: number) => void;
  setIsCollapsibleOpen: (isOpen: boolean) => void;
};

export const useStore = create<State & Action>()(
  persist(
    (set, get) => ({
      favoritesIds: [],
      isCollapsibleOpen: false,
      setIsCollapsibleOpen: (isOpen: boolean) =>
        set(() => ({ isCollapsibleOpen: isOpen })),
      handleFavorites: (id: number) => {
        const { favoritesIds } = get();
        if (!favoritesIds.includes(id)) {
          return set((state) => ({
            isCollapsibleOpen: true,
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
