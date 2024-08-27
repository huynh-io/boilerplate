import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const firebaseAnalytics = getAnalytics(firebaseApp);

interface SignUpParams {
  email: string;
  password: string;
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
}
export const signUp = async (params: SignUpParams) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      params.email,
      params.password
    );
    // Signed up
    const user = userCredential.user;

    if (params.onSuccess) {
      params.onSuccess(user);
    }
  } catch (error) {
    if (params.onError) {
      params.onError(error);
    }
  }
};
