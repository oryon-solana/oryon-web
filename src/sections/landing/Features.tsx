import { Layers, Shield, Sparkles, Zap } from "lucide-react";

const features = [
  { icon: Zap, title: "Sub-second swaps", desc: "Settle reward conversions in under 400ms with predictable, near-zero fees." },
  { icon: Layers, title: "Universal liquidity", desc: "Aggregated pools across 240+ loyalty programs — one route, best price." },
  { icon: Shield, title: "Non-custodial", desc: "Your keys, your points. Audited contracts secured by formal verification." },
  { icon: Sparkles, title: "Composable rewards", desc: "Stake, lend, or wrap loyalty assets into yield-bearing primitives." },
];

const Features = () => (
  <section className="relative py-32">
    <div className="mx-auto max-w-7xl px-6">
      <div className="max-w-2xl mb-16">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">Protocol</p>
        <h2 className="text-4xl md:text-6xl font-light tracking-tight text-gradient leading-tight">
          Built for the velocity of points.
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="glass rounded-3xl p-7 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="h-11 w-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:shadow-glow-soft transition-shadow">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
