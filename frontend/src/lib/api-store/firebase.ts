import { initializeApp, type FirebaseApp } from "firebase/app";
import { useMutation } from "@tanstack/react-query";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  type Auth,
  type User as FirebaseUser,
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

const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);

// Initialize Firebase lazily — only when credentials are present.
// During static builds (next build) env vars may be empty, so eager
// initialization would throw "auth/invalid-api-key".
let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;

function getFirebaseApp(): FirebaseApp {
  if (!_app) {
    _app = initializeApp(firebaseConfig);
  }
  return _app;
}

function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

/** @deprecated Use getFirebaseAuth() — kept for backward compatibility */
export const firebaseAuth = isFirebaseConfigured
  ? getFirebaseAuth()
  : (undefined as unknown as Auth);

export const firebaseAnalytics = isFirebaseConfigured
  ? isSupported().then((yes) => (yes ? getAnalytics(getFirebaseApp()) : null))
  : Promise.resolve(null);

export const googleAuthProvider = new GoogleAuthProvider();

export function useSignInWithEmail(options?: NonNullable<unknown>) {
  return useMutation({
    ...options,
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

export function useSignInWithGoogle(options?: NonNullable<unknown>) {
  return useMutation({
    ...options,
    mutationFn: async (): Promise<FirebaseUser> => {
      const userCredential = await signInWithPopup(
        firebaseAuth,
        googleAuthProvider
      );

      return userCredential.user;
    },
  });
}

export function useSignOut(options?: NonNullable<unknown>) {
  return useMutation({
    ...options,
    mutationFn: async (): Promise<void> => {
      await signOut(firebaseAuth);
    },
  });
}

export function useSignUpWithEmail(options?: NonNullable<unknown>) {
  return useMutation({
    ...options,
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
