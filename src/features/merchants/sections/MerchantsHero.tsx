import { MERCHANTS } from "../lib/data";

export default function MerchantsHero() {
  const live = MERCHANTS.filter((m) => m.active).length;
  const soon = MERCHANTS.filter((m) => !m.active).length;

  return (
    <div className="max-w-[1100px] mx-auto px-8 pt-16 pb-12 relative z-[1]">
      <div
        className="inline-flex items-center gap-2 mb-5 px-3.5 py-[5px] rounded-full font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em]"
        style={{
          background: "oklch(0.60 0.22 250 / 0.12)",
          border: "1px solid oklch(0.60 0.22 250 / 0.25)",
          color: "oklch(0.70 0.20 250)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: "oklch(0.70 0.20 250)", boxShadow: "0 0 8px oklch(0.70 0.20 250)" }}
        />
        {live} Active · {soon} Coming Soon
      </div>

      <h1 className="text-[clamp(36px,4.5vw,44px)] font-bold text-[#e8f0f8] tracking-tight leading-[1.1] mb-3">
        Supported <span style={{ color: "oklch(0.70 0.20 250)" }}>Merchants</span>
      </h1>
      <p className="text-[15px] text-[#5a7090] max-w-[480px]">
        Convert, stake, and earn across every loyalty program in the Oryon network.
      </p>
    </div>
  );
}
