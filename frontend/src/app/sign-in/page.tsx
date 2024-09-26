"use client";

import AuthForm from "@/components/auth-form";
import { useSignInWithEmail, useSignInWithGoogle } from "@/lib/api-store";
import { useAppStore, AppState } from "@/lib/app-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { mutate: signInWithEmail } = useSignInWithEmail();
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
    <div className="flex items-start justify-center min-h-screen bg-background p-10">
      <AuthForm
        type="SignIn"
        onEmail={signInWithEmail}
        onGoogle={signInWithGoogle}
      />
    </div>
  );
}
