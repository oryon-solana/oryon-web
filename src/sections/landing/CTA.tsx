import { Button } from "@/components/ui/button";

const CTA = () => (
  <section className="py-[120px] px-20 relative overflow-hidden bg-[#080b10]">
    {/* Blue radial glow behind card */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse, oklch(0.60 0.22 250 / 0.1) 0%, transparent 70%)",
      }}
    />

    <div className="relative z-[1] max-w-[600px] mx-auto bg-[#0d1117] border border-[#1e2a3a] rounded-[20px] px-14 py-[72px] text-center">
      <h2 className="text-[clamp(32px,3.5vw,50px)] font-bold leading-[1.1] tracking-tight text-[#e8f0f8] mb-4">
        Your points deserve
        <br />a{" "}
        <span style={{ color: "oklch(0.70 0.20 250)" }}>network.</span>
      </h2>
      <p className="text-[15px] text-[#5a7090] mb-9 leading-relaxed">
        Join 4.1M wallets already swapping, staking and unlocking liquidity on
        Oryon.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          className="h-auto px-[26px] py-[13px] rounded-lg text-sm font-semibold tracking-wide bg-primary text-white hover:bg-primary/90 transition-all hover:shadow-[0_0_32px_oklch(0.60_0.22_250_/_0.3)] hover:-translate-y-px"
        >
          Launch App →
        </Button>
        <Button
          variant="outline"
          className="h-auto px-[26px] py-[13px] rounded-lg text-sm bg-transparent border-[#1e2a3a] text-[#a0b4c8] hover:text-[#e8f0f8] hover:border-[#2a3a50] hover:bg-transparent transition-colors"
        >
          Talk to sales
        </Button>
      </div>
    </div>
  </section>
);

export default CTA;
