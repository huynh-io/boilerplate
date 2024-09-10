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

export interface AuthFormProps {
  type: "SignIn" | "SignUp";
  onEmailClick?: () => void;
  onGoogleClick?: () => void;
}

export default function AuthForm(props: AuthFormProps) {
  const cta = props.type === "SignIn" ? "Sign In" : "Sign Up";
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{cta}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="me@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full">{cta}</Button>
        <Button variant="outline" className="w-full">
          {cta} with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
