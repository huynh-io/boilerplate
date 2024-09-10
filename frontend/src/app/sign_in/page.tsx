"use client";

import AuthForm from "@/components/auth-form";
import { firebaseAuth, googleAuthProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const signInWithEmail = async (
    email: string | undefined,
    password: string | undefined
  ) => {
    // TODO: Error handling
    if (!email || !password) {
      return;
    }

    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    router.push("/");
    return userCredential.user;
  };

  const signInWithGoogle = async () => {
    const userCredential = await signInWithPopup(
      firebaseAuth,
      googleAuthProvider
    );

    router.push("/");
    return userCredential.user;
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-10">
      <AuthForm
        type="SignIn"
        onEmail={signInWithEmail}
        onGoogle={signInWithGoogle}
      />
    </div>
  );
}
