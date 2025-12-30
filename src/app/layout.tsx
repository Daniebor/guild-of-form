import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

// 1. Configure the Body Font (Readability)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// 2. Configure the Header Font (Fantasy/Arcane)
const cinzel = Cinzel({ 
  subsets: ["latin"], 
  variable: "--font-cinzel",
  weight: ["400", "700", "900"] 
});

export const metadata: Metadata = {
  title: "The Sculptor's Saga",
  description: "Gamified ZBrush Education Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} bg-void text-white`}>
        {/* We will add the <ForgeHeader /> here later */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}