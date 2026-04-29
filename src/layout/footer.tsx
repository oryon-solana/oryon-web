const cols = [
  { title: "Protocol", links: ["Swap", "Stake", "Bridge", "Analytics"] },
  { title: "Build", links: ["Docs", "SDK", "API", "Grants"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Connect", links: ["Twitter", "Discord", "GitHub", "Mirror"] },
];

const Footer = () => (
  <footer className="relative border-t border-border/50 pt-20 pb-10">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid md:grid-cols-[1.5fr_repeat(4,1fr)] gap-10 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-full bg-gradient-primary" />
            <span className="text-lg font-semibold">Oryon</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            The capital market for loyalty. Built on a high-performance network.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-xs font-mono uppercase tracking-widest text-foreground mb-4">{c.title}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground font-mono pt-8 border-t border-border/50">
        <span>© 2026 Oryon Labs. All rights reserved.</span>
        <span>v2.1.0 · mainnet-beta</span>
      </div>
    </div>
  </footer>
);

export default Footer;
