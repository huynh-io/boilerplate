"use client";

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
import React from "react";

export interface AuthFormProps {
  type: "SignIn" | "SignUp";
  onEmail?: ({ email, password }: { email: string; password: string }) => void;
  onGoogle?: () => void;
}

export default function AuthForm(props: AuthFormProps) {
  const emailInput = React.useRef<HTMLInputElement>(null);
  const passwordInput = React.useRef<HTMLInputElement>(null);

  const cta = props.type === "SignIn" ? "Sign In" : "Sign Up";

  const onEmailSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (props.onEmail) {
      if (!emailInput.current?.value || !passwordInput.current?.value) {
        throw new Error("Email and password are missing.");
      }

      props.onEmail({
        email: emailInput.current.value,
        password: passwordInput.current.value,
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <form>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{cta}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              ref={emailInput}
              type="email"
              placeholder="me@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              ref={passwordInput}
              type="password"
              placeholder="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={onEmailSubmit} type="submit">
            {cta}
          </Button>
          <Button variant="outline" className="w-full" onClick={props.onGoogle}>
            {cta} with Google
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
