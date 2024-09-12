"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useAppStore from "@/lib/store";
import AppState from "@/lib/app-state";

export default function Header() {
  const router = useRouter();
  const { authenticated, signOut, isMobileMenuOpen, setMobileMenuOpen } =
    useAppStore((state: AppState) => {
      return {
        authenticated: state.authenticated,
        isMobileMenuOpen: state.isMobileMenuOpen,
        setMobileMenuOpen: state.setMobileMenuOpen,
        signOut: state.signOut,
      };
    });

  const { theme, setTheme } = useTheme();
  const signOutAndRedirect = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <nav className="bg-background border-b relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Bellaire
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {authenticated ? (
              <Button
                variant="outline"
                className="h-9"
                onClick={signOutAndRedirect}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="outline" className="h-9">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="h-9">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b shadow-lg">
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="px-2 space-y-1">
                <Button
                  variant="outline"
                  className="w-full mb-2 justify-start"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
                  Toggle theme
                </Button>
                {authenticated ? (
                  <Button
                    variant="outline"
                    className="h-9"
                    onClick={signOutAndRedirect}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button variant="outline" className="w-full mb-2">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
