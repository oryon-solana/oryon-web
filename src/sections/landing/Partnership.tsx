const partners = [
  "Binance",
  "Mastercard",
  "Airbnb",
  "Marriott",
  "Lufthansa",
  "Nubank",
  "Stripe",
  "Ondo",
];

const Partnership = () => (
  <section className="py-14 px-20 border-y border-[#1e2a3a] bg-[#080b10]">
    <p className="text-center font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.15em] text-[#5a7090] mb-7">
      Trusted by Fortune 500 brands
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
      {partners.map((p) => (
        <div
          key={p}
          className="text-center font-[family-name:var(--font-mono)] text-[13px] font-bold uppercase tracking-[0.08em] text-[#2a3a50] hover:text-[#5a7090] transition-colors cursor-default"
        >
          {p}
        </div>
      ))}
    </div>
  </section>
);

export default Partnership;
