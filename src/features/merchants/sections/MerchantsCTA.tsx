import Link from "next/link";

export default function MerchantsCTA() {
  return (
    <div className="max-w-[1100px] mx-auto px-8 pb-24 relative z-[1]">
      <div
        className="rounded-3xl p-10 md:px-12 flex items-center justify-between gap-8 flex-wrap relative overflow-hidden"
        style={{ background: "#0d1117", border: "1px solid #1e2a3a" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 120% at 0% 50%, oklch(0.60 0.22 250 / 0.07), transparent)" }}
        />
        <div className="relative">
          <div
            className="text-[11px] font-[family-name:var(--font-mono)] tracking-[0.1em] uppercase mb-2"
            style={{ color: "oklch(0.70 0.20 250)" }}
          >
            For brands
          </div>
          <h3 className="text-[24px] font-bold text-[#e8f0f8] tracking-tight mb-1.5">Not seeing your brand here?</h3>
          <p className="text-[14px] text-[#5a7090]">Apply to join the Oryon merchant network and unlock on-chain loyalty.</p>
        </div>
        <Link
          href="/partnership"
          className="relative shrink-0 flex items-center gap-2 rounded-xl px-7 py-3.5 text-[14px] font-bold text-white transition-all bg-primary hover:bg-[oklch(0.70_0.20_250)] hover:shadow-[0_0_32px_oklch(0.60_0.22_250_/_0.3)] hover:-translate-y-px"
        >
          Add Your Merchant →
        </Link>
      </div>
    </div>
  );
}
