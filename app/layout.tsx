import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import { NavBar } from "../components/nav-bar";
import { Footer } from "../components/footer";
import "./globals.css";
import type { Metadata } from "next";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Translator",
  description: "A modern language translation app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="flex-grow mb-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
