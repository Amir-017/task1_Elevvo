import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProfile = create(
  persist(
    (set) => ({
      profile: { name: "", email: "", phone: "", jobTitle: "", bio: "" },
      saveProfile: (profile) => set({ profile }),
    }),
    { name: "profile" } 
  )
);