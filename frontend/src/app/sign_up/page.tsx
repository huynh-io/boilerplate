"use client";

import AuthForm from "@/components/auth-form";
import { firebaseAuth, googleAuthProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const signUpWithEmail = async (
    email: string | undefined,
    password: string | undefined
  ) => {
    // TODO: Error handling
    if (!email || !password) {
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    router.push("/");
    return userCredential.user;
  };

  const signUpWithGoogle = async () => {
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
        type="SignUp"
        onEmail={signUpWithEmail}
        onGoogle={signUpWithGoogle}
      />
    </div>
  );
}
