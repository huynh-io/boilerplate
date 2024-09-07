"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, LogOut, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const pathname = usePathname();

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
  };

  const handleSignUp = () => {
    console.log("Sign Up clicked");
    // Add your sign up logic here
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              My Next.js App
            </span>
          </Link>
          <div className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality here if needed */}
          </div>
          <nav className="flex items-center space-x-2">
            {isSignedIn ? (
              <Button variant="outline" onClick={toggleSignIn}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={toggleSignIn}>
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
                <Button variant="default" onClick={handleSignUp}>
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Button>
              </>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-2 py-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {isSignedIn ? (
                    <Button
                      variant="outline"
                      onClick={toggleSignIn}
                      className="mt-2"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={toggleSignIn}
                        className="mt-2"
                      >
                        <LogIn className="mr-2 h-4 w-4" /> Sign In
                      </Button>
                      <Button
                        variant="default"
                        onClick={handleSignUp}
                        className="mt-2"
                      >
                        <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </nav>
    </header>
  );
}
