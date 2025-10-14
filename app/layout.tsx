import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import {ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";


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
              <h1 className="text-xl font-bold">SyncFlow</h1>
              <ModeToggle />
            </div>
          </header>
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
