import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aivana — Ship better code, faster",
    template: "%s · Aivana",
  },
  description:
    "AI-powered GitHub code reviews that catch bugs, security issues, and maintainability problems before production.",
  verification: {
    google: "_ynBJsZtnXA-_syZQ9lTXtY6fkGO1vl9kDMsXSmB-Rs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <script
          src="https://www.glancelytics.com/js/script.js"
          data-domain="aivana"
          defer
        ></script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>{children}</TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
