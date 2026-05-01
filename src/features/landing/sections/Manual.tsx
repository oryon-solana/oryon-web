import type { ReactNode } from "react";
import { STEPS } from "../lib/data";

const Manual = () => (
  <section className="py-[120px] px-20 bg-[#0d1117] border-y border-[#1e2a3a]">
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      {/* Left — steps */}
      <div>
        <p
          className="font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-[0.15em] mb-5"
          style={{ color: "oklch(0.70 0.20 250)" }}
        >
          How it works
        </p>
        <h2 className="text-[clamp(32px,3.5vw,52px)] font-bold leading-[1.1] tracking-tight text-[#e8f0f8] max-w-[480px] mb-10">
          On-chain points,{" "}
          <span style={{ color: "oklch(0.70 0.20 250)" }}>off-chain</span>{" "}
          simplicity.
        </h2>

        <div className="flex flex-col gap-8">
          {STEPS.map((s) => (
            <div key={s.num} className="flex gap-5 items-start">
              <div
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-[family-name:var(--font-mono)] text-[11px] font-bold"
                style={{
                  background: "oklch(0.60 0.22 250 / 0.12)",
                  border: "1px solid oklch(0.60 0.22 250 / 0.3)",
                  color: "oklch(0.70 0.20 250)",
                }}
              >
                {s.num}
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-[#e8f0f8] mb-1.5">
                  {s.title}
                </h4>
                <p className="text-[13.5px] leading-relaxed text-[#5a7090]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — terminal */}
      <div className="bg-[#080b10] border border-[#1e2a3a] rounded-xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1e2a3a] bg-[#0d1117]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>

        {/* Body */}
        <div className="p-6 font-[family-name:var(--font-mono)] text-[12px] leading-[1.8]">
          <TermLine prompt cmd="oryon init --wallet" />
          <TermLine output="✓ Wallet connected: 0x4f…a3b2" />

          <div className="mt-3" />
          <TermLine prompt cmd="oryon tokenize --program marriott --amount 50000" />
          <TermLine
            output={
              <>
                ✓ Minted 50,000{" "}
                <span style={{ color: "oklch(0.78 0.17 250)" }}>MRW</span>{" "}
                tokens
              </>
            }
          />

          <div className="mt-3" />
          <TermLine prompt cmd="oryon swap MRW USDC --slippage 0.5%" />
          <TermLine
            output={
              <>
                Route: MRW →{" "}
                <span style={{ color: "oklch(0.78 0.17 250)" }}>USDC</span>
              </>
            }
          />
          <TermLine
            output={
              <>
                Rate: 1 MRW ={" "}
                <span style={{ color: "oklch(0.78 0.17 250)" }}>0.0082 USDC</span>
              </>
            }
          />
          <TermLine
            output={
              <>
                Fee:{" "}
                <span style={{ color: "oklch(0.78 0.17 250)" }}>0.03%</span> ·
                ~380ms
              </>
            }
          />
          <TermLine output="✓ Swap settled on-chain" />

          <div className="mt-3" />
          <div className="flex gap-3">
            <span style={{ color: "oklch(0.70 0.20 250)" }}>$</span>
            <span
              className="inline-block w-0.5 h-[1em] align-text-bottom animate-blink"
              style={{ background: "oklch(0.70 0.20 250)" }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

function TermLine({
  prompt,
  cmd,
  output,
}: {
  prompt?: boolean;
  cmd?: string;
  output?: ReactNode;
}) {
  if (prompt) {
    return (
      <div className="flex gap-3">
        <span style={{ color: "oklch(0.70 0.20 250)" }}>$</span>
        <span className="text-[#a0b4c8]">{cmd}</span>
      </div>
    );
  }
  return (
    <div className="flex gap-3 ml-6">
      <span style={{ color: "oklch(0.70 0.18 145)" }}>{output}</span>
    </div>
  );
}

export default Manual;
