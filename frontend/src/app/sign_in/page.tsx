"use client";

import AuthForm from "@/components/auth-form";
import useAppStore, { AppState } from "@/lib/store";

export default function SignInPage() {
  const { signInWithEmail, signInWithGoogle } = useAppStore(
    (state: AppState) => {
      return {
        signInWithEmail: state.signInWithEmail,
        signInWithGoogle: state.signInWithGoogle,
      };
    }
  );

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
