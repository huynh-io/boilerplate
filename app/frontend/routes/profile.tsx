import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUsersMe, useSignOut } from "@/lib/api-store";
import { useAppStore, type AppState } from "@/lib/app-store";
import { useEffect } from "react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const authenticated = useAppStore((state: AppState) => state.authenticated);
  const { data: currentUser, isLoading } = useGetUsersMe();
  const { mutate: signOut, isSuccess: isSignOutSuccess } = useSignOut();

  useEffect(() => {
    if (!authenticated) {
      navigate({ to: "/sign-in" });
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (isSignOutSuccess) {
      navigate({ to: "/sign-in" });
    }
  }, [isSignOutSuccess, navigate]);

  return (
    <div className="flex items-start justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your profile information here.
          </CardDescription>
        </CardHeader>

        {isLoading && <Skeleton className="w-[100px] h-[20px] rounded-full" />}

        {!isLoading && currentUser && (
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{currentUser.email}</h2>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={currentUser.email}
                disabled={true}
              />
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
          {currentUser?.admin && (
            <Button
              variant="outline"
              className="max-w-xs w-full"
              onClick={() => navigate({ to: "/admin" })}
            >
              Admin Dashboard
            </Button>
          )}
          <Button
            variant="destructive"
            className="max-w-xs w-full"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
