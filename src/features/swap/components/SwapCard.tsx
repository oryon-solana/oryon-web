import { T } from "../lib/theme";
import { BrandDropdown } from "./BrandDropdown";
import type { Brand } from "../types";

type Props = {
  brands: Brand[];
  fromId: string;
  toId: string;
  fromAmt: string;
  toAmt: number;
  fromBrand: Brand;
  toBrand: Brand;
  balances: Record<string, number>;
  error: string;
  flipping: boolean;
  rate: number;
  fee: number;
  hasAmt: boolean;
  canConvert: boolean;
  onFromChange: (id: string) => void;
  onToChange: (id: string) => void;
  onAmtInput: (val: string) => void;
  onFlip: () => void;
  onOpenModal: () => void;
};

export function SwapCard({
  brands,
  fromId,
  toId,
  fromAmt,
  toAmt,
  fromBrand,
  toBrand,
  balances,
  error,
  flipping,
  rate,
  fee,
  hasAmt,
  canConvert,
  onFromChange,
  onToChange,
  onAmtInput,
  onFlip,
  onOpenModal,
}: Props) {
  const unitFrom = fromBrand.unit.replace(/s$/, "");
  const unitTo = toBrand.unit.replace(/s$/, "");

  return (
    <div
      className="rounded-3xl p-6 mb-4"
      style={{
        background: T.n900,
        border: `1px solid ${T.n800}`,
        boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* FROM */}
      <div
        className="rounded-2xl p-5 transition-all duration-200"
        style={{
          background: T.n800,
          border: `1px solid ${error ? "oklch(60% 0.22 25 / 0.4)" : T.n700}`,
          opacity: flipping ? 0 : 1,
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <span
            className="text-[11px] font-semibold font-mono tracking-[0.1em] uppercase"
            style={{ color: T.n400 }}
          >
            From
          </span>
          <span className="text-[12px]" style={{ color: T.n400 }}>
            Balance:{" "}
            <strong className="font-mono" style={{ color: fromBrand.color }}>
              {(balances[fromId] ?? 0).toLocaleString()}
            </strong>
          </span>
        </div>
        <BrandDropdown
          brands={brands}
          selected={fromId}
          onChange={onFromChange}
          exclude={toId}
        />

        <div className="mt-3.5 relative">
          <input
            type="number"
            min="0"
            value={fromAmt}
            onChange={(e) => onAmtInput(e.target.value)}
            placeholder="0"
            className="w-full pr-[110px] pl-[18px] py-3.5 text-[30px] font-bold font-mono rounded-[14px] outline-none transition-all duration-150 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{
              color: T.white,
              background: T.n900,
              border: `1.5px solid ${error ? "oklch(60% 0.22 25 / 0.5)" : hasAmt ? T.blueBorder : T.n700}`,
              boxShadow: hasAmt && !error ? `0 0 0 3px ${T.blueDim}` : "none",
            }}
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex gap-1.5">
            {(["HALF", "MAX"] as const).map((lbl) => (
              <button
                key={lbl}
                onClick={() =>
                  onAmtInput(
                    String(
                      lbl === "MAX"
                        ? balances[fromId]
                        : Math.floor(balances[fromId] / 2),
                    ),
                  )
                }
                className="rounded-[6px] px-2 py-1 text-[10px] font-bold font-mono tracking-[0.05em] cursor-pointer transition-all duration-100"
                style={{
                  background: T.n700,
                  border: `1px solid ${T.n600}`,
                  color: T.n300,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = T.n600;
                  e.currentTarget.style.color = T.white;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = T.n700;
                  e.currentTarget.style.color = T.n300;
                }}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-1.5 mt-2">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke={T.red}
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="text-[12px] font-medium" style={{ color: T.red }}>
              {error}
            </span>
          </div>
        )}
      </div>

      {/* FLIP */}
      <div className="flex justify-center my-3">
        <button
          onClick={onFlip}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
          style={{
            background: T.n800,
            border: `1.5px solid ${T.n700}`,
            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "rotate(180deg)";
            e.currentTarget.style.borderColor = T.blue4;
            e.currentTarget.style.boxShadow = `0 0 16px ${T.blueGlow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.borderColor = T.n700;
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.3)";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={T.n200}
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
        </button>
      </div>

      {/* TO */}
      <div
        className="rounded-2xl p-5 transition-all duration-200"
        style={{
          background: T.n800,
          border: `1px solid ${hasAmt && !error ? "oklch(65% 0.18 155 / 0.3)" : T.n700}`,
          opacity: flipping ? 0 : 1,
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <span
            className="text-[11px] font-semibold font-mono tracking-[0.1em] uppercase"
            style={{ color: T.n400 }}
          >
            To
          </span>
          <span className="text-[12px]" style={{ color: T.n400 }}>
            Balance:{" "}
            <strong className="font-mono" style={{ color: toBrand.color }}>
              {(balances[toId] ?? 0).toLocaleString()}
            </strong>
          </span>
        </div>
        <BrandDropdown
          brands={brands}
          selected={toId}
          onChange={onToChange}
          exclude={fromId}
        />

        <div className="mt-3.5">
          <div
            className="px-[18px] py-3.5 text-[30px] font-bold font-mono rounded-[14px] min-h-[66px] flex items-center transition-all duration-200"
            style={{
              color: hasAmt && !error ? T.green : T.n600,
              background: T.n900,
              border: `1.5px solid ${hasAmt && !error ? "oklch(65% 0.18 155 / 0.3)" : T.n700}`,
              boxShadow:
                hasAmt && !error
                  ? "0 0 0 3px oklch(65% 0.18 155 / 0.08)"
                  : "none",
            }}
          >
            {hasAmt && !error ? toAmt.toLocaleString() : "—"}
          </div>
        </div>
      </div>

      {/* RATE ROW */}
      {hasAmt && !error && (
        <div
          className="flex justify-center gap-3 mt-3.5 text-[12px] font-mono animate-[fadeIn_.2s_ease]"
          style={{ color: T.n400 }}
        >
          <span>
            1 {unitFrom} = <strong style={{ color: T.blue3 }}>{rate}</strong>{" "}
            {unitTo}
          </span>
          <span style={{ color: T.n700 }}>·</span>
          <span>
            Fee:{" "}
            <strong style={{ color: T.n200 }}>
              {fee.toLocaleString()} pts
            </strong>
          </span>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => canConvert && onOpenModal()}
        className="w-full mt-[18px] py-4 rounded-[14px] border-none text-[15px] font-bold tracking-[-0.01em] transition-all duration-200"
        style={{
          background: canConvert ? T.blue : T.n800,
          color: canConvert ? "white" : T.n600,
          cursor: canConvert ? "pointer" : "not-allowed",
        }}
        onMouseEnter={(e) => {
          if (canConvert) {
            e.currentTarget.style.background = T.blue4;
            e.currentTarget.style.boxShadow = `0 0 32px ${T.blueGlow}`;
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (canConvert) {
            e.currentTarget.style.background = T.blue;
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "none";
          }
        }}
      >
        {canConvert
          ? `Convert ${Number(fromAmt).toLocaleString()} ${fromBrand.unit} →`
          : "Enter an amount to convert"}
      </button>
    </div>
  );
}
