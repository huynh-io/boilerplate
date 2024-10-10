"use client";

import AuthForm from "@/components/auth-form";
import { useSignInWithGoogle, useSignUpWithEmail } from "@/lib/api-store";
import { useAppStore, AppState } from "@/lib/app-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { mutate: signUpWithEmail } = useSignUpWithEmail();
  const { mutate: signInWithGoogle } = useSignInWithGoogle();

  const router = useRouter();
  const { authenticated } = useAppStore((state: AppState) => {
    return { authenticated: state.authenticated };
  });

  useEffect(() => {
    if (authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-4">
      <AuthForm
        type="SignUp"
        onEmail={signUpWithEmail}
        onGoogle={signInWithGoogle}
      />
    </div>
  );
}
