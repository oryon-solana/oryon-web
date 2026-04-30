import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Oryon — The Loyalty Layer for Web3",
  description:
    "Oryon turns brand loyalty points into liquid on-chain assets. Swap rewards instantly across 240+ programs on a high-performance Web3 network.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("dark", spaceGrotesk.variable, spaceMono.variable)}
      style={{ fontFamily: "var(--font-sans, 'Space Grotesk', sans-serif)" }}
    >
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-sans)]">
        {/* Scan-line ambient effect */}
        <div
          className="fixed inset-x-0 top-0 h-0.5 pointer-events-none z-[999] animate-scanline"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.60 0.22 250 / 0.15), transparent)",
          }}
        />
        {children}
      </body>
    </html>
  );
}
