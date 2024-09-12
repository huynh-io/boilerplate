import { StateCreator } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "@/lib/firebase";

export interface AuthenticationSlice {
  authenticated: boolean;
  authenticationInitialized: boolean;
  authenticate: (auth: boolean) => void;
  initializedAuthentication: () => void;
  signInWithEmail: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signOut: () => void;
  signUpWithEmail: (email: string, password: string) => void;
}

export const createAuthenticationSlice: StateCreator<AuthenticationSlice> = (
  set
) => ({
  authenticated: false,
  authenticationInitialized: false,
  authenticate: (auth: boolean) => {
    set({ authenticated: auth });
  },
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
});
