import { Link } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";
import { useTheme } from "@/components/theme-provider";
import { Menu, X, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore, type AppState } from "@/lib/app-store";

export default function Header() {
  const { authenticated, isMobileMenuOpen } = useAppStore(
    useShallow((state: AppState) => ({
      authenticated: state.authenticated,
      isMobileMenuOpen: state.isMobileMenuOpen,
    })),
  );

  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-background border-b fixed top-0 right-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              {import.meta.env.VITE_APP_NAME || "Boilerplate"}
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
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Profile</span>
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="outline" className="h-9">
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="h-9">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() =>
                useAppStore.setState({ isMobileMenuOpen: !isMobileMenuOpen })
              }
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
                  <Link to="/profile">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-5 w-5 mr-2" />
                      User Profile
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/sign-in">
                      <Button variant="outline" className="w-full mb-2">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/sign-up">
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
