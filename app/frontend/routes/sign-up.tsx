import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AuthForm, { type SignUpValues } from "@/components/auth-form";
import { useSignUp } from "@/lib/api-store";
import { useAppStore, type AppState } from "@/lib/app-store";
import { useEffect } from "react";

export const Route = createFileRoute("/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
  const { mutate: signUp, error } = useSignUp();
  const navigate = useNavigate();
  const authenticated = useAppStore((state: AppState) => state.authenticated);

  useEffect(() => {
    if (authenticated) {
      navigate({ to: "/" });
    }
  }, [authenticated, navigate]);

  const handleSubmit = (values: SignUpValues) => {
    signUp(values);
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-4">
      <AuthForm type="SignUp" onSubmit={handleSubmit} error={error?.message} />
    </div>
  );
}
