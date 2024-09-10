import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface AppState {
  signUpWithEmail: () => void;
  signUpWithGoogle: () => void;
}

// TODO: slice up the store once this file gets too large
const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          signUpWithEmail: () => {
            console.log("Signing up with email");
          },
          signUpWithGoogle: () => {
            console.log("Signing up with Google");
          },
        };
      },
      {
        name: "bellaire-storage",
      }
    )
  )
);
