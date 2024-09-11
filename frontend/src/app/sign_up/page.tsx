"use client";

import AuthForm from "@/components/auth-form";
import useAppStore, { AppState } from "@/lib/store";

export default function SignUpPage() {
  const { authenticated, signUpWithEmail, signInWithGoogle } = useAppStore(
    (state: AppState) => {
      return {
        authenticated: state.authenticated,
        signUpWithEmail: state.signUpWithEmail,
        signInWithGoogle: state.signInWithGoogle,
      };
    }
  );

  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-10">
      <AuthForm
        type="SignUp"
        onEmail={signUpWithEmail}
        onGoogle={signInWithGoogle}
      />
    </div>
  );
}
