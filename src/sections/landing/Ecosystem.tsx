import { ArrowUpRight } from "lucide-react";

const cards = [
  { tag: "Hackathon", title: "Oryon Frontier '26", date: "May 12 – Jun 9", loc: "Online", hue: 200 },
  { tag: "Summit", title: "Loyalty Reimagined", date: "Sep 4", loc: "New York", hue: 220 },
  { tag: "Workshop", title: "Build on Oryon SDK", date: "Oct 18", loc: "Singapore", hue: 195 },
];

const Ecosystem = () => (
  <section className="relative py-32">
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">Ecosystem</p>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-gradient leading-tight max-w-2xl">
            Meet Oryon IRL.
            <br />Build the future.
          </h2>
        </div>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          View all events <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {cards.map((c) => (
          <a
            key={c.title}
            href="#"
            className="group relative rounded-3xl overflow-hidden glass hover:border-primary/40 transition-all"
          >
            <div
              className="aspect-[4/3] relative overflow-hidden"
              style={{
                background: `radial-gradient(circle at 30% 20%, hsl(${c.hue} 100% 60% / 0.6), hsl(${c.hue} 100% 20% / 0.2) 60%, hsl(222 47% 4%))`,
              }}
            >
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-wider">
                {c.tag}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute right-4 top-4 h-9 w-9 rounded-full glass flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-2 tracking-tight">{c.title}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground font-mono">
                <span>{c.date}</span>
                <span>{c.loc}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Ecosystem;
