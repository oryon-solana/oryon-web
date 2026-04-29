import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.webm"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Overlay: darker in dark mode, lighter in light mode */}
      <div className="absolute inset-0 bg-background/70 dark:bg-background/80" />
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-xs font-mono uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              Mainnet live · v2.1
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-light tracking-tight">
              <span className="text-gradient">The loyalty layer</span>
              <br />
              <span className="text-glow font-normal">for Web3.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Oryon turns brand points into liquid, on-chain assets. Swap
              rewards across every program, instantly — settled on a
              high-performance network.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="h-12 px-7 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90"
              >
                Start swapping <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-12 px-7 rounded-full border border-border/80 hover:bg-secondary/50"
              >
                Read whitepaper
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { v: "$1.2B", l: "Volume swapped" },
                { v: "240+", l: "Loyalty programs" },
                { v: "4.1M", l: "Active wallets" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-light text-glow">
                    {s.v}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono uppercase mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
