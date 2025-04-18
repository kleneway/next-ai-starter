import React from "react";
import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { Metadata } from "next";
import ClientProvider from "@/components/ClientProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeAwareToast } from "@/components/theme/ThemeAwareToast";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Forq - Project Task Management",
  description: "Manage your project tasks efficiently with Forq",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 dark:from-stone-900 dark:to-stone-800">
        <ThemeProvider defaultTheme="system" enableSystem>
          <ClientProvider>
            <TRPCReactProvider>
              <div className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-50 w-full border-b border-amber-200 dark:border-stone-700 bg-amber-50/80 dark:bg-stone-900/90 backdrop-blur-sm">
                  <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                      <Image
                        src="/logo.png"
                        alt="Forq Logo"
                        width={48}
                        height={48}
                        // className="dark:invert"
                      />
                      <span className="font-display text-xl font-bold text-primary-dark">
                        Forq
                      </span>
                    </Link>
                    <nav className="flex items-center space-x-4">
                      <Link
                        href="/"
                        className="text-sm font-medium text-stone-700 hover:text-amber-800 dark:text-amber-100 dark:hover:text-amber-300 transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        href="/dashboard"
                        className="text-sm font-medium text-stone-700 hover:text-amber-800 dark:text-amber-100 dark:hover:text-amber-300 transition-colors"
                      >
                        Dashboard
                      </Link>
                    </nav>
                  </div>
                </header>
                <main className="flex-grow">{children}</main>
                <footer className="py-4 border-t border-amber-200 dark:border-stone-700 bg-amber-50 dark:bg-stone-900 text-center text-sm text-stone-500 dark:text-stone-400">
                  <div className="container mx-auto px-4">
                    &copy; {new Date().getFullYear()} Forq - Task Management
                  </div>
                </footer>
              </div>
              <ThemeAwareToast />
            </TRPCReactProvider>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
