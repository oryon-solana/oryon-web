import Image from "next/image";

const cols = [
  { title: "Protocol", links: ["Swap", "Stake", "Bridge", "Analytics"] },
  { title: "Build", links: ["Docs", "SDK", "API", "Grants"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Connect", links: ["Twitter", "Discord", "GitHub", "Mirror"] },
];

const Footer = () => (
  <footer className="border-t border-[#1e2a3a] pt-16 pb-10 px-20">
    <div className="grid md:grid-cols-[240px_1fr] gap-20 mb-14">
      <div>
        <Image
          src="/logo-color.svg"
          alt="Oryon"
          width={100}
          height={28}
          className="h-7 w-auto mb-4"
        />
        <p className="text-[13px] leading-relaxed text-[#5a7090] max-w-[220px]">
          The capital market for loyalty. Built on a high-performance network.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {cols.map((c) => (
          <div key={c.title}>
            <h5 className="font-[family-name:var(--font-mono)] text-[11px] font-bold text-[#5a7090] uppercase tracking-[0.12em] mb-4">
              {c.title}
            </h5>
            <ul className="flex flex-col gap-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[13.5px] text-[#5a7090] hover:text-[#e8f0f8] transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[#1e2a3a]">
      <p className="text-[12px] text-[#2a3a50] font-[family-name:var(--font-mono)]">
        © 2026 Oryon Labs. All rights reserved.
      </p>
      <span className="text-[11px] text-[#2a3a50] font-[family-name:var(--font-mono)] tracking-wide">
        v2.1.0 · mainnet-beta
      </span>
    </div>
  </footer>
);

export default Footer;
