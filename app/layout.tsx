import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "sonner";

import {ClerkProvider, OrganizationSwitcher, SignInButton, SignedOut, UserButton} from "@clerk/nextjs";


const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syncflow",
  description: "Organise, track and manage your projects seamlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem
        disableTransitionOnChange>
          <header className="border-b">
            <div className="container mx-auto h-16 flex items-center justify-between">
              <h1 className="text-xl font-bold text-cyan-400">SyncFlow2<span className="text-sm font-medium text-gray-500"> - Beta</span></h1>
              <OrganizationSwitcher hidePersonal={true} />
              <UserButton afterSignOutUrl="/" />
              <SignedOut>
                <SignInButton mode="modal">Sign In</SignInButton>
              </SignedOut>
              <ModeToggle />
            </div>
          </header>
          <main>
            {children}
            <Toaster position="bottom-right" richColors />
          </main>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
