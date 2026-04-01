import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;

type AuthFormValues = {
  email: string;
  password: string;
  passwordConfirmation?: string;
};

export type AuthFormProps =
  | { type: "SignIn"; onSubmit: (values: SignInValues) => void; error?: string }
  | {
      type: "SignUp";
      onSubmit: (values: SignUpValues) => void;
      error?: string;
    };

export default function AuthForm({ type, onSubmit, error }: AuthFormProps) {
  const isSignUp = type === "SignUp";
  const cta = isSignUp ? "Sign Up" : "Sign In";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
  });

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit((values) => {
          if (isSignUp) {
            (onSubmit as (values: SignUpValues) => void)(
              values as SignUpValues,
            );
          } else {
            (onSubmit as (values: SignInValues) => void)(
              values as SignInValues,
            );
          }
        })}
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{cta}</CardTitle>
          <CardDescription />
        </CardHeader>

        <CardContent className="space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="me@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message as string}
              </p>
            )}
          </div>
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="password"
                {...register("passwordConfirmation")}
              />
              {errors.passwordConfirmation && (
                <p className="text-sm text-destructive">
                  {errors.passwordConfirmation.message as string}
                </p>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button className="max-w-xs w-full" type="submit">
            {cta}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
