import { T } from "../lib/theme";
import type { Brand } from "../types";

type Props = {
  fromBrand: Brand;
  toBrand: Brand;
  balances: Record<string, number>;
  numAmt: number;
  toAmt: number;
};

export function BalancePreview({
  fromBrand,
  toBrand,
  balances,
  numAmt,
  toAmt,
}: Props) {
  const items = [
    {
      brand: fromBrand,
      before: balances[fromBrand.id] ?? 0,
      after: (balances[fromBrand.id] ?? 0) - numAmt,
      delta: -numAmt,
    },
    {
      brand: toBrand,
      before: balances[toBrand.id] ?? 0,
      after: (balances[toBrand.id] ?? 0) + toAmt,
      delta: +toAmt,
    },
  ];

  return (
    <div
      className="rounded-[20px] px-6 py-5 mb-4 animate-[fadeIn_.3s_ease]"
      style={{
        background: T.n900,
        border: `1px solid ${T.n800}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="text-[11px] font-semibold font-mono tracking-[0.1em] uppercase mb-4"
        style={{ color: T.n400 }}
      >
        Balance Preview
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ brand, before, after, delta }) => (
          <div
            key={brand.id}
            className="rounded-[14px] p-4"
            style={{ background: T.n800, border: `1px solid ${T.n700}` }}
          >
            <div className="flex items-center gap-2 mb-3">
              {brand.logo(20)}
              <span
                className="text-[12px] font-semibold"
                style={{ color: T.n200 }}
              >
                {brand.name}
              </span>
            </div>
            {(
              [
                ["Before", before, T.n300],
                ["After", after, delta < 0 ? T.red : T.green],
              ] as [string, number, string][]
            ).map(([lbl, val, clr]) => (
              <div key={lbl} className="flex justify-between text-[12px] mb-1">
                <span style={{ color: T.n400 }}>{lbl}</span>
                <span
                  className="font-semibold font-mono"
                  style={{ color: clr }}
                >
                  {val.toLocaleString()}
                </span>
              </div>
            ))}
            <div
              className="mt-2 text-[11px] font-bold font-mono text-right"
              style={{ color: delta < 0 ? T.red : T.green }}
            >
              {delta > 0 ? "+" : ""}
              {delta.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
