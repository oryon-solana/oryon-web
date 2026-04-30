import { Fragment } from "react";
import { Button } from "@/components/ui/button";

const stats = [
  { v: "$1.2B", l: "On-chain Supply" },
  { v: "240+", l: "Loyalty Programs" },
  { v: "4.1M", l: "Active Wallets" },
];

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center px-20 pt-[120px] pb-20 overflow-hidden bg-[#080b10]">
    {/* Video background */}
    <video
      className="absolute inset-0 w-full h-full object-cover opacity-35 z-0"
      src="/hero.webm"
      autoPlay
      muted
      loop
      playsInline
    />

    {/* Blue radial glow + bottom fade */}
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 60% 70% at 65% 40%, oklch(0.60 0.22 250 / 0.08) 0%, transparent 70%), linear-gradient(to bottom, transparent 60%, #080b10 100%)",
      }}
    />

    {/* Grid lines */}
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(oklch(0.60 0.22 250 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.60 0.22 250 / 0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    {/* Content */}
    <div className="relative z-[2] max-w-[640px]">
      {/* Live badge */}
      <div
        className="inline-flex items-center gap-2 mb-7 px-[14px] py-[5px] rounded-full font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.08em]"
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
        Mainnet Live · v2.1
      </div>

      <h1 className="text-[clamp(42px,5.5vw,72px)] font-bold leading-[1.08] tracking-[-0.02em] mb-6 text-[#e8f0f8]">
        The{" "}
        <span style={{ color: "oklch(0.70 0.20 250)" }}>loyalty</span>
        <br />
        layer
        <br />
        for Web3.
      </h1>

      <p className="text-base leading-relaxed text-[#7a90a8] max-w-[440px] mb-9">
        Oryon turns brand points into liquid, on-chain assets. Swap rewards
        across every program, instantly — settled on a high-performance network.
      </p>

      <div className="flex flex-wrap items-center gap-[14px]">
        <Button
          className="h-auto px-[26px] py-[13px] rounded-lg text-sm font-semibold tracking-wide bg-primary text-white hover:bg-primary/90 transition-all hover:shadow-[0_0_32px_oklch(0.60_0.22_250_/_0.3)] hover:-translate-y-px"
        >
          Start Swapping →
        </Button>
        <Button
          variant="outline"
          className="h-auto px-[26px] py-[13px] rounded-lg text-sm bg-transparent border-[#1e2a3a] text-[#a0b4c8] hover:text-[#e8f0f8] hover:border-[#2a3a50] hover:bg-transparent transition-colors"
        >
          Read Whitepaper
        </Button>
      </div>
    </div>

    {/* Stats */}
    <div className="relative z-[2] flex items-center gap-12 mt-16">
      {stats.map((s, i) => (
        <Fragment key={s.l}>
          {i > 0 && <div className="w-px h-10 bg-[#1e2a3a]" />}
          <div className="flex flex-col gap-1">
            <span className="font-[family-name:var(--font-mono)] text-[26px] font-bold text-[#e8f0f8] tracking-tight">
              {s.v}
            </span>
            <span className="text-[11px] font-medium text-[#5a7090] uppercase tracking-[0.1em]">
              {s.l}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  </section>
);

export default Hero;
