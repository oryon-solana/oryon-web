import { Globe, Layers, Lock, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Sub-second swaps",
    desc: "Settle real-time conversions in under 400ms with predictable, near-zero fees.",
  },
  {
    icon: Globe,
    title: "Universal liquidity",
    desc: "Aggregate pools across 240+ loyalty programs — and route best price automatically.",
  },
  {
    icon: Lock,
    title: "Non-custodial",
    desc: "Your keys, your points. Audited contracts secured by formal verification.",
  },
  {
    icon: Layers,
    title: "Composable rewards",
    desc: "Stake, lend, or wrap loyalty assets into yield-bearing primitives.",
  },
];

const Features = () => (
  <section className="py-[120px] px-20 bg-[#080b10]">
    <p
      className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.15em] mb-5"
      style={{ color: "oklch(0.70 0.20 250)" }}
    >
      Protocol
    </p>
    <h2 className="text-[clamp(32px,3.5vw,52px)] font-bold leading-[1.1] tracking-tight text-[#e8f0f8] max-w-[520px] mb-14">
      Built for the{" "}
      <span style={{ color: "oklch(0.70 0.20 250)" }}>velocity</span> of
      points.
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((f) => (
        <div
          key={f.title}
          className="group relative bg-[#0d1117] border border-[#1e2a3a] rounded-xl p-7 overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:border-[oklch(0.60_0.22_250_/_0.35)] hover:shadow-[0_12px_40px_#00000066,0_0_0_1px_oklch(0.60_0.22_250_/_0.1)]"
        >
          {/* Hover radial glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% -20%, oklch(0.60 0.22 250 / 0.12), transparent)",
            }}
          />

          <div
            className="relative z-[1] w-9 h-9 rounded-lg flex items-center justify-center mb-5"
            style={{
              background: "oklch(0.60 0.22 250 / 0.12)",
              border: "1px solid oklch(0.60 0.22 250 / 0.2)",
            }}
          >
            <f.icon
              className="w-4 h-4"
              style={{ stroke: "oklch(0.70 0.20 250)", strokeWidth: 1.5 }}
            />
          </div>

          <h3 className="relative z-[1] text-[15px] font-semibold text-[#e8f0f8] mb-2.5">
            {f.title}
          </h3>
          <p className="relative z-[1] text-[13.5px] leading-relaxed text-[#5a7090]">
            {f.desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Features;
