const benefits = [
  [
    "On-chain liquidity",
    "Your loyalty points become tradeable on-chain assets.",
  ],
  [
    "Real-time analytics",
    "Track conversions, volume, and wallet activity live.",
  ],
  [
    "Zero setup fee",
    "Free to list. We earn only when your points are swapped.",
  ],
];

interface Props {
  merchantCount?: number;
  loadingCount?: boolean;
}

export default function PartnershipHero({ merchantCount, loadingCount }: Props) {
  return (
    <div className="animate-slide-up">
      <div
        className="inline-flex items-center gap-2 mb-6 px-3.5 py-[5px] rounded-full font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em]"
        style={{
          background: "oklch(0.60 0.22 250 / 0.12)",
          border: "1px solid oklch(0.60 0.22 250 / 0.25)",
          color: "oklch(0.70 0.20 250)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{
            background: "oklch(0.70 0.20 250)",
            boxShadow: "0 0 8px oklch(0.70 0.20 250)",
          }}
        />
        For Merchants
      </div>

      <h1 className="text-[clamp(36px,4vw,42px)] font-bold text-[#e8f0f8] tracking-tight leading-[1.1] mb-4">
        Add Your
        <br />
        <span style={{ color: "oklch(0.70 0.20 250)" }}>Merchant</span> Today
      </h1>
      <p className="text-[15px] text-[#5a7090] leading-[1.7] mb-10 max-w-[440px]">
        Join the Oryon network and let your customers swap, earn, and redeem
        loyalty points on-chain. Setup takes minutes — your brand is live in
        days.
      </p>

      <div className="flex flex-col gap-4">
        {benefits.map(([title, desc]) => (
          <div key={title} className="flex gap-3.5 items-start">
            <div
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
              style={{
                background: "oklch(0.60 0.22 250 / 0.12)",
                border: "1px solid oklch(0.60 0.22 250 / 0.25)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="oklch(0.70 0.20 250)"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#e8f0f8] mb-0.5">
                {title}
              </div>
              <div className="text-[13px] text-[#5a7090] leading-[1.55]">
                {desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-10 p-4 rounded-2xl flex items-center gap-4"
        style={{ background: "#0d1117", border: "1px solid #1e2a3a" }}
      >
        <div
          className="text-[28px] font-bold font-[family-name:var(--font-mono)] leading-none"
          style={{ color: "oklch(0.70 0.20 250)" }}
        >
          {loadingCount ? "—" : `${merchantCount ?? 0}+`}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#e8f0f8]">
            Merchants already live
          </div>
          <div className="text-[12px] text-[#5a7090]">
            Across F&B, hotels, travel, retail & finance
          </div>
        </div>
      </div>
    </div>
  );
}
