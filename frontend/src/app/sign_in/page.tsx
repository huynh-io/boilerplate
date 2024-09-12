"use client";

import AuthForm from "@/components/auth-form";
import useAppStore, { AppState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const { authenticated, signInWithEmail, signInWithGoogle } = useAppStore(
    (state: AppState) => {
      return {
        authenticated: state.authenticated,
        signInWithEmail: state.signInWithEmail,
        signInWithGoogle: state.signInWithGoogle,
      };
    }
  );

  useEffect(() => {
    if (authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

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
