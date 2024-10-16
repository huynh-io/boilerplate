import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import "./globals.css";
import Authenticator from "@/components/authenticator";
import ApiProvider from "@/components/api-provider";

export const metadata: Metadata = {
  title: "Bellaire",
  description: "Bring the food you miss home.",
  keywords: ["Food", "Shopping"],
  authors: [{ name: "John Huynh" }],
  creator: "John Huynh",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ApiProvider>
            <Authenticator>
              <div className="relative flex h-full max-h-screen flex-col overflow-clip">
                <Header />
                <main className="flex-1 mt-16">{children}</main>
              </div>
            </Authenticator>
          </ApiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
