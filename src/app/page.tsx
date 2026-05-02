import type { Metadata } from "next";
import Hero from "@/features/landing/sections/Hero";
import Partnership from "@/features/landing/sections/Partnership";
import Features from "@/features/landing/sections/Features";
import Manual from "@/features/landing/sections/Manual";
import CTA from "@/features/landing/sections/CTA";

export const metadata: Metadata = {
  title: "Oryon — The Loyalty Layer for Web3",
  description:
    "Swap loyalty rewards across 240+ brands instantly. Oryon turns brand points into liquid, on-chain assets.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#080b10] overflow-x-hidden">
      <Hero />
      <Partnership />
      <Features />
      <Manual />
      <CTA />
    </main>
  );
}
