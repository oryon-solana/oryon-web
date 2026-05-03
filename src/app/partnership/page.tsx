import type { Metadata } from "next";
import PartnershipSection from "@/features/partnership/sections/PartnershipSection";

export const metadata: Metadata = {
  title: "Partnership — Oryon",
  description:
    "Join the Oryon network. Add your merchant and let customers earn, swap, and redeem loyalty points on-chain.",
};

export default function PartnershipPage() {
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
      <div
        className="fixed left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none z-0"
        style={{
          top: "20%",
          background:
            "radial-gradient(ellipse, oklch(0.60 0.22 250 / 0.06) 0%, transparent 70%)",
        }}
      />
      <PartnershipSection />
    </main>
  );
}
