const partners = ["NEBULA", "VOLTAIR", "AXION", "QUANTA", "HELIOS", "NOVA", "CIPHER", "ORION"];

const Partners = () => (
  <section className="relative py-16 border-y border-border/50">
    <div className="mx-auto max-w-7xl px-6">
      <p className="text-center text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-10">
        Trusted by category-defining brands
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
        {partners.map((p) => (
          <div key={p} className="text-center text-muted-foreground/70 hover:text-foreground transition-colors font-mono text-sm tracking-widest">
            {p}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Partners;
