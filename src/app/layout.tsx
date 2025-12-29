import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import AppShell from "@/components/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Guild Of Form",
  description: "A gamified approach to mastering 3D modeling.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${newsreader.variable} font-sans bg-background-dark text-text-main antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
