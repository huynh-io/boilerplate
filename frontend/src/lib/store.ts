import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

export interface AppState {
  authenticated: boolean;
  authenticate: (auth: boolean) => void;
  signUpWithEmail: () => void;
  signUpWithGoogle: () => void;
}

// TODO:
// - slice up the store once this file gets too large
// - fix redux chrome devtools integration
const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        authenticated: false,
        authenticate: (auth: boolean) => {
          set({ authenticated: auth });
        },
        signUpWithEmail: () => {
          console.log("Signing up with email");
        },
        signUpWithGoogle: () => {
          console.log("Signing up with Google");
        },
      }),
      {
        name: "bellaire-storage",
      }
    )
  )
);

export default useStore;
