import { initializeApp } from "firebase/app";
import { useMutation } from "@tanstack/react-query";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  User as FirebaseUser,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseAnalytics = isSupported().then((yes) =>
  yes ? getAnalytics(firebaseApp) : null
);
export const googleAuthProvider = new GoogleAuthProvider();

export function useSignInWithEmailAndPassword() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<FirebaseUser> => {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      return userCredential.user;
    },
  });
}

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: async (): Promise<FirebaseUser> => {
      const userCredential = await signInWithPopup(
        firebaseAuth,
        googleAuthProvider
      );

      return userCredential.user;
    },
  });
}

export function useSignOut() {
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await firebaseSignOut(firebaseAuth);
    },
  });
}

export function useSignUpWithEmail() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<FirebaseUser> => {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      return userCredential.user;
    },
  });
}
