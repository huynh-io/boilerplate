import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import "./globals.css";
import Authenticator from "@/components/authenticator";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Authenticator>
              <Header />
              <main className="flex-1">{children}</main>
            </Authenticator>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
