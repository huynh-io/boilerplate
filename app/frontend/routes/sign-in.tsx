import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AuthForm, { type SignInValues } from "@/components/auth-form";
import { useSignIn } from "@/lib/api-store";
import { useAppStore, type AppState } from "@/lib/app-store";
import { useEffect } from "react";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const { mutate: signIn, error } = useSignIn();
  const navigate = useNavigate();
  const authenticated = useAppStore((state: AppState) => state.authenticated);

  useEffect(() => {
    if (authenticated) {
      navigate({ to: "/" });
    }
  }, [authenticated, navigate]);

  const handleSubmit = (values: SignInValues) => {
    signIn(values);
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-4">
      <AuthForm type="SignIn" onSubmit={handleSubmit} error={error?.message} />
    </div>
  );
}
