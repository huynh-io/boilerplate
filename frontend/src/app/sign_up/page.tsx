import AuthForm from "@/components/auth-form";

export default function SignUpPage() {
  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-10">
      <AuthForm type="SignUp" />
    </div>
  );
}
