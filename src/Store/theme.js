import { create } from "zustand";
import { persist } from "zustand/middleware";

const apply = (theme) =>
  document.documentElement.classList.toggle("dark", theme === "dark");

export const useTheme = create(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        apply(next);
        set({ theme: next });
      },
    }),
    {
      name: "theme",
      onRehydrateStorage: () => (state) => {
        if (state) apply(state.theme);
      },
    }
  )
);