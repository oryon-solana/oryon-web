import type { Metadata } from "next";
import MerchantsHero from "@/features/merchants/sections/MerchantsHero";
import MerchantsGrid from "@/features/merchants/sections/MerchantsGrid";
import MerchantsCTA from "@/features/merchants/sections/MerchantsCTA";

export const metadata: Metadata = {
  title: "Merchants — Oryon",
  description: "Explore 240+ supported merchants. Convert, stake, and earn loyalty points across every program in the Oryon network.",
};

export default function MerchantsPage() {
  return (
    <main className="relative min-h-screen bg-[#080b10] pt-[60px]">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.60 0.22 250 / 0.03) 1px, transparent 1px), linear-gradient(90deg, oklch(0.60 0.22 250 / 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <MerchantsHero />
      <MerchantsGrid />
      <MerchantsCTA />
    </main>
  );
}
