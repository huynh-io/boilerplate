import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Authenticator from "@/components/authenticator";
import ApiProvider from "@/components/api-provider";
import ErrorBoundary from "@/components/error-boundary";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system">
      <ApiProvider>
        <Authenticator>
          <ErrorBoundary>
            <div className="relative flex h-full max-h-screen flex-col overflow-clip">
              <Header />
              <main className="flex-1 mt-16">
                <Outlet />
              </main>
            </div>
          </ErrorBoundary>
        </Authenticator>
      </ApiProvider>
    </ThemeProvider>
  );
}
