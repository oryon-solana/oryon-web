import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => (
  <section className="relative py-32">
    <div className="mx-auto max-w-7xl px-6">
      <div className="relative glass-strong rounded-[2rem] p-12 md:p-20 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-glow opacity-80" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-gradient leading-tight max-w-3xl mx-auto">
            Your points deserve a network.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Join 4.1M wallets already swapping, staking and unlocking liquidity on Oryon.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow">
              Launch App <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost" className="h-12 px-8 rounded-full border border-border/80">
              Talk to sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
