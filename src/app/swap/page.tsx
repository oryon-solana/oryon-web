"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── THEME TOKENS ──
const T = {
  n950: "#080b10",
  n900: "#0d1117",
  n850: "#111720",
  n800: "#161e2a",
  n700: "#1e2a3a",
  n600: "#2a3a50",
  n400: "#5a7090",
  n300: "#7a90a8",
  n200: "#a0b4c8",
  n100: "#c8d8e8",
  white: "#e8f0f8",
  blue: "oklch(60% 0.22 250)",
  blue4: "oklch(70% 0.20 250)",
  blue3: "oklch(78% 0.17 250)",
  blueDim: "oklch(60% 0.22 250 / 0.12)",
  blueBorder: "oklch(60% 0.22 250 / 0.25)",
  blueGlow: "oklch(60% 0.22 250 / 0.3)",
  green: "oklch(65% 0.18 155)",
  greenDim: "oklch(65% 0.18 155 / 0.15)",
  red: "oklch(60% 0.22 25)",
  redDim: "oklch(60% 0.22 25 / 0.12)",
};

// ── BRAND DATA ──
type Brand = {
  id: string;
  name: string;
  unit: string;
  color: string;
  balance: number;
  logo: (s?: number) => React.ReactNode;
};

const BRANDS: Brand[] = [
  {
    id: "mcdonalds",
    name: "McDonald's",
    unit: "Points",
    color: "#e8a020",
    balance: 3200,
    logo: (s = 32) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#DA291C" />
        <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="800" fill="#FFC72C" fontFamily="Arial Black,Arial">M</text>
      </svg>
    ),
  },
  {
    id: "starbucks",
    name: "Starbucks",
    unit: "Stars",
    color: "#3dba7b",
    balance: 840,
    logo: (s = 32) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#00704A" />
        <circle cx="16" cy="16" r="7" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M16 10 L17.2 13.8 L21 13.8 L18 16.2 L19 20 L16 17.5 L13 20 L14 16.2 L11 13.8 L14.8 13.8 Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "kfc",
    name: "KFC",
    unit: "Points",
    color: "#e05060",
    balance: 1500,
    logo: (s = 32) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#E4002B" />
        <text x="16" y="22" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="Arial">KFC</text>
      </svg>
    ),
  },
  {
    id: "wendys",
    name: "Wendy's",
    unit: "Points",
    color: "#e05060",
    balance: 2100,
    logo: (s = 32) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#E2231A" />
        <text x="16" y="22" textAnchor="middle" fontSize="14" fontWeight="800" fill="white" fontFamily="Arial">W</text>
      </svg>
    ),
  },
  {
    id: "subway",
    name: "Subway",
    unit: "Tokens",
    color: "#3dba7b",
    balance: 680,
    logo: (s = 32) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#009B3A" />
        <text x="16" y="21" textAnchor="middle" fontSize="10" fontWeight="800" fill="#FFC600" fontFamily="Arial">SUB</text>
      </svg>
    ),
  },
  {
    id: "dominos",
    name: "Domino's",
    unit: "Points",
    color: "#6b9fff",
    balance: 950,
    logo: (s = 32) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#006491" />
        <rect x="8" y="10" width="7" height="12" rx="2" fill="#E31837" />
        <rect x="17" y="10" width="7" height="12" rx="2" fill="white" />
        <circle cx="11.5" cy="16" r="1.5" fill="white" />
        <circle cx="20.5" cy="13" r="1.5" fill="#006491" />
        <circle cx="20.5" cy="19" r="1.5" fill="#006491" />
      </svg>
    ),
  },
  {
    id: "hilton",
    name: "Hilton",
    unit: "Points",
    color: "#6b9fff",
    balance: 12000,
    logo: (s = 32) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#003087" />
        <text x="16" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="Georgia,serif">H</text>
      </svg>
    ),
  },
  {
    id: "marriott",
    name: "Marriott",
    unit: "Points",
    color: "#e8a020",
    balance: 8500,
    logo: (s = 32) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#8A0000" />
        <text x="16" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="Georgia,serif">M</text>
      </svg>
    ),
  },
];

const RATES: Record<string, number> = {
  "mcdonalds-starbucks": 0.66, "mcdonalds-kfc": 0.90, "mcdonalds-wendys": 0.88,
  "mcdonalds-subway": 0.72, "mcdonalds-dominos": 0.80, "mcdonalds-hilton": 0.05, "mcdonalds-marriott": 0.04,
  "starbucks-mcdonalds": 1.50, "starbucks-kfc": 1.40, "starbucks-wendys": 1.35,
  "starbucks-subway": 1.20, "starbucks-dominos": 1.30, "starbucks-hilton": 0.08, "starbucks-marriott": 0.07,
  "hilton-marriott": 0.90, "hilton-mcdonalds": 15.0, "hilton-starbucks": 10.5,
  "marriott-hilton": 1.10, "marriott-mcdonalds": 18.0, "marriott-starbucks": 12.0,
};

function getRate(a: string, b: string) {
  const k = `${a}-${b}`, r = `${b}-${a}`;
  return RATES[k] ?? (RATES[r] ? +(1 / RATES[r]).toFixed(4) : 0.75);
}

const FEE = 0.015;

type HistoryItem = { id: number; from: string; to: string; fromAmt: number; toAmt: number; date: string };

const HISTORY_INIT: HistoryItem[] = [
  { id: 1, from: "mcdonalds", to: "starbucks", fromAmt: 500, toAmt: 330, date: "Apr 28, 2026" },
  { id: 2, from: "hilton", to: "marriott", fromAmt: 2000, toAmt: 1800, date: "Apr 25, 2026" },
  { id: 3, from: "kfc", to: "wendys", fromAmt: 300, toAmt: 264, date: "Apr 20, 2026" },
];

// ── CRYON LOGO ──
function CryonLogo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" stroke="oklch(60% 0.22 250 / 0.3)" strokeWidth="1" />
      <line x1="16" y1="4" x2="16" y2="28" stroke="oklch(70% 0.20 250)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4" y1="16" x2="28" y2="16" stroke="oklch(70% 0.20 250)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="7.5" y1="7.5" x2="24.5" y2="24.5" stroke="oklch(70% 0.20 250)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="24.5" y1="7.5" x2="7.5" y2="24.5" stroke="oklch(70% 0.20 250)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" fill="oklch(70% 0.20 250)" opacity="0.9" />
    </svg>
  );
}

// ── BRAND DROPDOWN ──
function BrandDropdown({ selected, onChange, exclude }: { selected: string; onChange: (id: string) => void; exclude: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const brand = BRANDS.find((b) => b.id === selected)!;

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 w-full rounded-xl px-3.5 py-2.5 cursor-pointer transition-all duration-150"
        style={{
          background: open ? T.n700 : T.n800,
          border: `1.5px solid ${open ? T.blue4 : T.n700}`,
          boxShadow: open ? `0 0 0 3px ${T.blueDim}` : "none",
        }}
      >
        {brand.logo(26)}
        <div className="flex-1 text-left">
          <div className="text-[15px] font-semibold" style={{ color: T.white }}>{brand.name}</div>
          <div className="text-[11px] font-mono" style={{ color: T.n300 }}>{brand.unit}</div>
        </div>
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke={T.n400} strokeWidth="2" strokeLinecap="round"
          className="flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-[14px] z-50 overflow-hidden"
          style={{ background: T.n850, border: `1px solid ${T.n700}`, boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}
        >
          {BRANDS.filter((b) => b.id !== exclude).map((b) => (
            <button
              key={b.id}
              onClick={() => { onChange(b.id); setOpen(false); }}
              className="flex items-center gap-2.5 w-full px-3.5 py-[11px] border-none cursor-pointer transition-colors duration-100"
              style={{ background: b.id === selected ? T.n700 : "transparent" }}
              onMouseEnter={(e) => { if (b.id !== selected) e.currentTarget.style.background = T.n800; }}
              onMouseLeave={(e) => { if (b.id !== selected) e.currentTarget.style.background = "transparent"; }}
            >
              {b.logo(24)}
              <div className="text-left">
                <div className="text-[13px] font-semibold" style={{ color: T.white }}>{b.name}</div>
                <div className="text-[11px] font-mono" style={{ color: T.n400 }}>{b.unit}</div>
              </div>
              {b.id === selected && (
                <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.blue4} strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MODAL ──
type ModalProps = {
  show: boolean;
  onClose: () => void;
  fromBrand: Brand;
  toBrand: Brand;
  fromAmt: string;
  toAmt: number;
  rate: number;
  fee: number;
  onConfirm: () => void;
  status: "idle" | "loading" | "success";
};

function Modal({ show, onClose, fromBrand, toBrand, fromAmt, toAmt, rate, fee, onConfirm, status }: ModalProps) {
  if (!show) return null;
  const unitFrom = fromBrand.unit.replace(/s$/, "");
  const unitTo = toBrand.unit.replace(/s$/, "");

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[200]"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget && status === "idle") onClose(); }}
    >
      <div
        className="w-full max-w-[400px] rounded-3xl p-10 mx-5"
        style={{
          background: T.n900,
          border: `1px solid ${T.n700}`,
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          animation: "slideUp .25s ease",
        }}
      >
        {status === "idle" && (
          <>
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                style={{ background: T.blueDim, border: `1px solid ${T.blueBorder}` }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.blue4} strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <h3 className="text-[19px] font-bold" style={{ color: T.white }}>Confirm Conversion</h3>
            </div>
            <p className="text-[13px] mb-7 pl-[46px]" style={{ color: T.n400 }}>Review the details below before converting.</p>

            <div className="rounded-2xl p-5 mb-5" style={{ background: T.n800, border: `1px solid ${T.n700}` }}>
              <div className="flex items-center justify-between mb-5">
                <div className="text-center">
                  {fromBrand.logo(36)}
                  <div className="text-[11px] mt-1.5" style={{ color: T.n400 }}>{fromBrand.name}</div>
                  <div className="text-[22px] font-bold font-mono" style={{ color: T.white }}>{Number(fromAmt).toLocaleString()}</div>
                  <div className="text-[10px]" style={{ color: T.n400 }}>{fromBrand.unit}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-px" style={{ background: T.n600 }} />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.blue4} strokeWidth="2" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <div className="w-8 h-px" style={{ background: T.n600 }} />
                </div>
                <div className="text-center">
                  {toBrand.logo(36)}
                  <div className="text-[11px] mt-1.5" style={{ color: T.n400 }}>{toBrand.name}</div>
                  <div className="text-[22px] font-bold font-mono" style={{ color: T.green }}>{toAmt.toLocaleString()}</div>
                  <div className="text-[10px]" style={{ color: T.n400 }}>{toBrand.unit}</div>
                </div>
              </div>

              {[
                ["Exchange rate", `1 ${unitFrom} = ${rate} ${unitTo}`],
                ["Service fee (1.5%)", `${fee.toLocaleString()} ${fromBrand.unit}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-[12px] mb-1.5 font-mono" style={{ color: T.n400 }}>
                  <span>{k}</span>
                  <span style={{ color: T.n200 }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={onClose}
                className="flex-1 py-[13px] rounded-xl text-[13px] font-semibold cursor-pointer transition-all duration-150"
                style={{ border: `1.5px solid ${T.n700}`, background: "transparent", color: T.n300 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.n600; e.currentTarget.style.color = T.white; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.n700; e.currentTarget.style.color = T.n300; }}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-[2] py-[13px] rounded-xl border-none text-[13px] font-bold cursor-pointer tracking-[0.02em] text-white transition-all duration-200"
                style={{ background: T.blue }}
                onMouseEnter={(e) => { e.currentTarget.style.background = T.blue4; e.currentTarget.style.boxShadow = `0 0 24px ${T.blueGlow}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = T.blue; e.currentTarget.style.boxShadow = "none"; }}
              >
                Confirm Convert →
              </button>
            </div>
          </>
        )}

        {status === "loading" && (
          <div className="text-center py-12">
            <div
              className="w-[52px] h-[52px] rounded-full mx-auto mb-6 animate-spin"
              style={{ border: `3px solid ${T.n700}`, borderTopColor: T.blue4 }}
            />
            <div className="text-[17px] font-semibold mb-1.5" style={{ color: T.white }}>Processing…</div>
            <div className="text-[13px] font-mono" style={{ color: T.n400 }}>Settling on-chain</div>
          </div>
        )}

        {status === "success" && (
          <div className="text-center py-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: T.greenDim, border: `1px solid ${T.green}` }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-[22px] font-bold mb-2" style={{ color: T.white }}>Conversion Complete</h3>
            <p className="text-[14px] mb-7" style={{ color: T.n400 }}>
              You received <strong style={{ color: T.green }}>{toAmt.toLocaleString()} {toBrand.unit}</strong>
            </p>
            <div className="flex gap-3 justify-center mb-7">
              {[
                { brand: fromBrand, value: `−${Number(fromAmt).toLocaleString()}`, clr: T.red },
                { brand: toBrand, value: `+${toAmt.toLocaleString()}`, clr: T.green },
              ].map(({ brand, value, clr }) => (
                <div key={brand.id} className="rounded-[14px] px-5 py-3.5 text-center" style={{ background: T.n800, border: `1px solid ${T.n700}` }}>
                  {brand.logo(24)}
                  <div className="text-[11px] mt-1.5" style={{ color: T.n400 }}>{brand.name}</div>
                  <div className="text-[17px] font-bold font-mono" style={{ color: clr }}>{value}</div>
                </div>
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl border-none text-[14px] font-bold cursor-pointer text-white"
              style={{ background: T.blue }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PAGE ──
export default function SwapPage() {
  const [fromId, setFromId] = useState("mcdonalds");
  const [toId, setToId] = useState("starbucks");
  const [fromAmt, setFromAmt] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [modal, setModal] = useState<{ show: boolean; status: "idle" | "loading" | "success" }>({ show: false, status: "idle" });
  const [balances, setBalances] = useState<Record<string, number>>(Object.fromEntries(BRANDS.map((b) => [b.id, b.balance])));
  const [history, setHistory] = useState<HistoryItem[]>(HISTORY_INIT);
  const [error, setError] = useState("");

  const fromBrand = BRANDS.find((b) => b.id === fromId)!;
  const toBrand = BRANDS.find((b) => b.id === toId)!;
  const rate = getRate(fromId, toId);
  const numAmt = parseFloat(fromAmt) || 0;
  const fee = Math.round(numAmt * FEE);
  const toAmt = Math.round((numAmt - fee) * rate);
  const hasAmt = numAmt > 0;
  const canConvert = hasAmt && !error && numAmt <= balances[fromId];

  function handleFlip() {
    setFlipping(true);
    setTimeout(() => {
      setFromId(toId); setToId(fromId);
      setFromAmt(""); setError(""); setFlipping(false);
    }, 200);
  }
  function handleFromChange(id: string) {
    if (id === toId) setToId(fromId);
    setFromId(id); setFromAmt(""); setError("");
  }
  function handleToChange(id: string) {
    if (id === fromId) setFromId(toId);
    setToId(id); setError("");
  }
  function handleAmtInput(val: string) {
    setError("");
    if (val === "" || /^\d*$/.test(val)) {
      setFromAmt(val);
      const n = parseInt(val) || 0;
      if (n > balances[fromId]) setError("Insufficient balance");
    }
  }
  function handleConfirm() {
    setModal({ show: true, status: "loading" });
    setTimeout(() => {
      setBalances((prev) => ({ ...prev, [fromId]: prev[fromId] - numAmt, [toId]: prev[toId] + toAmt }));
      setHistory((prev) => [{ id: Date.now(), from: fromId, to: toId, fromAmt: numAmt, toAmt, date: "Today" }, ...prev]);
      setFromAmt("");
      setModal({ show: true, status: "success" });
    }, 1800);
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: T.n950 }}>
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(oklch(60% 0.22 250 / 0.03) 1px,transparent 1px),linear-gradient(90deg,oklch(60% 0.22 250 / 0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Background glow */}
      <div
        className="fixed top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse,oklch(60% 0.22 250 / 0.06) 0%,transparent 70%)" }}
      />

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-[100] flex items-center justify-between px-12 h-[60px]"
        style={{
          background: "oklch(5% 0.02 250 / 0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(60% 0.22 250 / 0.12)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <CryonLogo size={30} />
          <span className="font-mono text-base font-bold tracking-[0.04em]" style={{ color: T.white }}>CRYON</span>
        </Link>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 rounded-[10px] px-3.5 py-[7px] mr-1"
            style={{ background: T.n800, border: `1px solid ${T.n700}` }}
          >
            <div className="w-[7px] h-[7px] rounded-full animate-pulse" style={{ background: T.green }} />
            <span className="text-[12px] font-medium font-mono" style={{ color: T.n200 }}>0x4f…a3b2</span>
          </div>
          <button
            className="rounded-[10px] px-[18px] py-2 text-[13px] font-semibold cursor-pointer text-white tracking-[0.02em] transition-all duration-200 border-none"
            style={{ background: T.blue }}
            onMouseEnter={(e) => { e.currentTarget.style.background = T.blue4; e.currentTarget.style.boxShadow = `0 0 20px ${T.blueGlow}`; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = T.blue; e.currentTarget.style.boxShadow = "none"; }}
          >
            My Points
          </button>
        </div>
      </nav>

      {/* ── BODY ── */}
      <div className="max-w-[520px] mx-auto px-5 pt-12 pb-24 relative z-[1]">

        {/* Header */}
        <div className="text-center mb-9">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-[5px] font-mono text-[11px] tracking-[0.08em] uppercase mb-5"
            style={{ background: T.blueDim, border: `1px solid ${T.blueBorder}`, color: T.blue4 }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
              style={{ background: T.blue4, boxShadow: `0 0 8px ${T.blue4}` }}
            />
            Points Converter
          </div>
          <h1 className="text-[32px] font-bold tracking-[-0.02em] mb-2 leading-[1.1]" style={{ color: T.white }}>
            Convert Your Points
          </h1>
          <p className="text-[14px]" style={{ color: T.n400 }}>Swap loyalty rewards across your favourite brands</p>
        </div>

        {/* ── SWAP CARD ── */}
        <div
          className="rounded-3xl p-6 mb-4"
          style={{ background: T.n900, border: `1px solid ${T.n800}`, boxShadow: "0 4px 32px rgba(0,0,0,0.4)" }}
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
              <span className="text-[11px] font-semibold font-mono tracking-[0.1em] uppercase" style={{ color: T.n400 }}>From</span>
              <span className="text-[12px]" style={{ color: T.n400 }}>
                Balance: <strong className="font-mono" style={{ color: fromBrand.color }}>{balances[fromId].toLocaleString()}</strong>
              </span>
            </div>
            <BrandDropdown selected={fromId} onChange={handleFromChange} exclude={toId} />

            <div className="mt-3.5 relative">
              <input
                type="number"
                min="0"
                value={fromAmt}
                onChange={(e) => handleAmtInput(e.target.value)}
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
                    onClick={() => handleAmtInput(String(lbl === "MAX" ? balances[fromId] : Math.floor(balances[fromId] / 2)))}
                    className="rounded-[6px] px-2 py-1 text-[10px] font-bold font-mono tracking-[0.05em] cursor-pointer transition-all duration-100"
                    style={{ background: T.n700, border: `1px solid ${T.n600}`, color: T.n300 }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = T.n600; e.currentTarget.style.color = T.white; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = T.n700; e.currentTarget.style.color = T.n300; }}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.red} strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-[12px] font-medium" style={{ color: T.red }}>{error}</span>
              </div>
            )}
          </div>

          {/* FLIP */}
          <div className="flex justify-center my-3">
            <button
              onClick={handleFlip}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
              style={{ background: T.n800, border: `1.5px solid ${T.n700}`, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(180deg)"; e.currentTarget.style.borderColor = T.blue4; e.currentTarget.style.boxShadow = `0 0 16px ${T.blueGlow}`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = T.n700; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.3)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.n200} strokeWidth="2.5" strokeLinecap="round">
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
              <span className="text-[11px] font-semibold font-mono tracking-[0.1em] uppercase" style={{ color: T.n400 }}>To</span>
              <span className="text-[12px]" style={{ color: T.n400 }}>
                Balance: <strong className="font-mono" style={{ color: toBrand.color }}>{balances[toId].toLocaleString()}</strong>
              </span>
            </div>
            <BrandDropdown selected={toId} onChange={handleToChange} exclude={fromId} />

            <div className="mt-3.5">
              <div
                className="px-[18px] py-3.5 text-[30px] font-bold font-mono rounded-[14px] min-h-[66px] flex items-center transition-all duration-200"
                style={{
                  color: hasAmt && !error ? T.green : T.n600,
                  background: T.n900,
                  border: `1.5px solid ${hasAmt && !error ? "oklch(65% 0.18 155 / 0.3)" : T.n700}`,
                  boxShadow: hasAmt && !error ? "0 0 0 3px oklch(65% 0.18 155 / 0.08)" : "none",
                }}
              >
                {hasAmt && !error ? toAmt.toLocaleString() : "—"}
              </div>
            </div>
          </div>

          {/* RATE ROW */}
          {hasAmt && !error && (
            <div className="flex justify-center gap-3 mt-3.5 text-[12px] font-mono animate-[fadeIn_.2s_ease]" style={{ color: T.n400 }}>
              <span>1 {fromBrand.unit.replace(/s$/, "")} = <strong style={{ color: T.blue3 }}>{rate}</strong> {toBrand.unit.replace(/s$/, "")}</span>
              <span style={{ color: T.n700 }}>·</span>
              <span>Fee: <strong style={{ color: T.n200 }}>{fee.toLocaleString()} pts</strong></span>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => canConvert && setModal({ show: true, status: "idle" })}
            className="w-full mt-[18px] py-4 rounded-[14px] border-none text-[15px] font-bold tracking-[-0.01em] transition-all duration-200"
            style={{
              background: canConvert ? T.blue : T.n800,
              color: canConvert ? "white" : T.n600,
              cursor: canConvert ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => { if (canConvert) { e.currentTarget.style.background = T.blue4; e.currentTarget.style.boxShadow = `0 0 32px ${T.blueGlow}`; e.currentTarget.style.transform = "translateY(-1px)"; } }}
            onMouseLeave={(e) => { if (canConvert) { e.currentTarget.style.background = T.blue; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; } }}
          >
            {canConvert ? `Convert ${Number(fromAmt).toLocaleString()} ${fromBrand.unit} →` : "Enter an amount to convert"}
          </button>
        </div>

        {/* ── BALANCE PREVIEW ── */}
        {hasAmt && !error && (
          <div
            className="rounded-[20px] px-6 py-5 mb-4 animate-[fadeIn_.3s_ease]"
            style={{ background: T.n900, border: `1px solid ${T.n800}`, boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
          >
            <div className="text-[11px] font-semibold font-mono tracking-[0.1em] uppercase mb-4" style={{ color: T.n400 }}>
              Balance Preview
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { brand: fromBrand, before: balances[fromId], after: balances[fromId] - numAmt, delta: -numAmt },
                { brand: toBrand, before: balances[toId], after: balances[toId] + toAmt, delta: +toAmt },
              ].map(({ brand, before, after, delta }) => (
                <div key={brand.id} className="rounded-[14px] p-4" style={{ background: T.n800, border: `1px solid ${T.n700}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    {brand.logo(20)}
                    <span className="text-[12px] font-semibold" style={{ color: T.n200 }}>{brand.name}</span>
                  </div>
                  {([["Before", before, T.n300], ["After", after, delta < 0 ? T.red : T.green]] as [string, number, string][]).map(([lbl, val, clr]) => (
                    <div key={lbl} className="flex justify-between text-[12px] mb-1">
                      <span style={{ color: T.n400 }}>{lbl}</span>
                      <span className="font-semibold font-mono" style={{ color: clr }}>{val.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="mt-2 text-[11px] font-bold font-mono text-right" style={{ color: delta < 0 ? T.red : T.green }}>
                    {delta > 0 ? "+" : ""}{delta.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── HISTORY ── */}
        <div
          className="rounded-[20px] px-6 py-5"
          style={{ background: T.n900, border: `1px solid ${T.n800}`, boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
        >
          <div className="text-[11px] font-semibold font-mono tracking-[0.1em] uppercase mb-4" style={{ color: T.n400 }}>
            Recent Conversions
          </div>
          {history.length === 0 && (
            <div className="text-center py-6 text-[13px] font-mono" style={{ color: T.n600 }}>No conversions yet</div>
          )}
          <div className="flex flex-col gap-2">
            {history.slice(0, 5).map((h) => {
              const fb = BRANDS.find((b) => b.id === h.from);
              const tb = BRANDS.find((b) => b.id === h.to);
              return (
                <div
                  key={h.id}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200"
                  style={{ background: T.n800, border: `1px solid ${T.n700}` }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.n600)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.n700)}
                >
                  <div className="flex items-center gap-1.5">
                    {fb?.logo(20)}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.n600} strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    {tb?.logo(20)}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold" style={{ color: T.n200 }}>{fb?.name} → {tb?.name}</div>
                    <div className="text-[11px] font-mono" style={{ color: T.n400 }}>{h.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-bold font-mono" style={{ color: T.green }}>+{h.toAmt.toLocaleString()}</div>
                    <div className="text-[11px] font-mono" style={{ color: T.n400 }}>−{h.fromAmt.toLocaleString()}</div>
                  </div>
                  <div
                    className="text-[10px] font-bold font-mono px-2 py-[3px] rounded-full uppercase tracking-[0.05em]"
                    style={{ background: T.greenDim, color: T.green, border: `1px solid ${T.green}40` }}
                  >
                    Done
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        show={modal.show}
        onClose={() => setModal({ show: false, status: "idle" })}
        fromBrand={fromBrand}
        toBrand={toBrand}
        fromAmt={fromAmt}
        toAmt={toAmt}
        rate={rate}
        fee={fee}
        onConfirm={handleConfirm}
        status={modal.status}
      />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
