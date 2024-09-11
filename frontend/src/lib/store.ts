import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "@/lib/firebase";

export interface AppState {
  authenticated: boolean;
  authenticate: (auth: boolean) => void;
  authenticationInitialized: boolean;
  initializedAuthentication: () => void;
  signInWithEmail: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signOut: () => void;
  signUpWithEmail: (email: string, password: string) => void;
}

// TODO:
// - slice up the store once this file gets too large
// - fix redux chrome devtools integration
const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        authenticated: false,
        authenticate: (auth: boolean) => {
          set({ authenticated: auth });
        },
        authenticationInitialized: false,
        initializedAuthentication: () => {
          set({ authenticationInitialized: true });
        },
        signInWithEmail: async (email, password) => {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password
          );

          return userCredential.user;
        },
        signInWithGoogle: async () => {
          const userCredential = await signInWithPopup(
            firebaseAuth,
            googleAuthProvider
          );

          return userCredential.user;
        },
        signOut: async () => {
          await firebaseSignOut(firebaseAuth);
        },
        signUpWithEmail: async (email, password) => {
          const userCredential = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
          );

          return userCredential.user;
        },
      }),
      {
        name: "bellaire-storage",
      }
    )
  )
);

export default useAppStore;
