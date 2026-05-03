"use client";

import { useState } from "react";
import type { Merchant } from "../types";

interface Props {
  m: Merchant;
  delay?: number;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const PALETTE = [
  "#1a3a6b", "#1a4a3b", "#4a1a1a", "#3b1a4a",
  "#1a3a4a", "#4a3b1a", "#1a4a4a", "#4a1a3b",
];

function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function MerchantAvatar({ name, size = 52 }: { name: string; size?: number }) {
  const label = initials(name);
  const bg = avatarColor(name);
  const r = Math.round(size * 0.25);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <rect width={size} height={size} rx={r} fill={bg} />
      <text
        x={size / 2}
        y={size * 0.67}
        textAnchor="middle"
        fontSize={size * 0.36}
        fontWeight="700"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        {label}
      </text>
    </svg>
  );
}

export default function MerchantCard({ m, delay = 0 }: Props) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="rounded-[20px] p-7 pb-6 flex flex-col items-center gap-3.5 relative overflow-hidden animate-fade-up cursor-default"
      style={{
        background: hov ? "#161e2a" : "#0d1117",
        border: `1px solid ${hov ? "oklch(0.60 0.22 250 / 0.25)" : "#1e2a3a"}`,
        boxShadow: hov
          ? "0 0 0 1px oklch(0.60 0.22 250 / 0.25), 0 16px 40px rgba(0,0,0,0.4)"
          : "0 2px 12px rgba(0,0,0,0.2)",
        transform: hov ? "translateY(-3px)" : "none",
        transition: "all 220ms ease",
        animationDelay: `${delay}ms`,
      }}
    >
      {hov && (
        <div
          className="absolute top-0 inset-x-0 h-[60px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 100% at 50% -20%, oklch(0.60 0.22 250 / 0.1), transparent)" }}
        />
      )}

      {/* Status badge */}
      <div className="absolute top-3.5 right-3.5">
        {m.active ? (
          <div
            className="flex items-center gap-1 rounded-full px-2 py-[3px]"
            style={{ background: "oklch(0.65 0.18 155 / 0.15)", border: "1px solid oklch(0.65 0.18 155 / 0.3)" }}
          >
            <div className="w-[5px] h-[5px] rounded-full animate-pulse" style={{ background: "oklch(0.65 0.18 155)" }} />
            <span className="text-[9px] font-bold font-[family-name:var(--font-mono)] tracking-[0.06em] uppercase" style={{ color: "oklch(0.65 0.18 155)" }}>Live</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 rounded-full px-2 py-[3px] bg-[#161e2a]" style={{ border: "1px solid #2a3a50" }}>
            <div className="w-[5px] h-[5px] rounded-full bg-[#5a7090]" />
            <span className="text-[9px] font-bold font-[family-name:var(--font-mono)] tracking-[0.06em] uppercase text-[#5a7090]">Soon</span>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div
        className="rounded-2xl shrink-0 transition-[box-shadow] duration-[220ms]"
        style={{ boxShadow: hov ? "0 0 24px oklch(0.60 0.22 250 / 0.15)" : "0 4px 16px rgba(0,0,0,0.3)" }}
      >
        <MerchantAvatar name={m.name} size={52} />
      </div>

      {/* Name */}
      <div className="text-center">
        <div className="text-[15px] font-bold text-[#e8f0f8] mb-0.5">{m.name}</div>
        <div className="text-[11px] text-[#5a7090] font-[family-name:var(--font-mono)] tracking-[0.04em]">
          ID #{m.merchantId}
        </div>
      </div>

      {/* Stats */}
      <div
        className="w-full rounded-xl p-3 grid grid-cols-2 gap-2"
        style={{ background: "#161e2a", border: "1px solid #1e2a3a" }}
      >
        <div>
          <div className="text-[10px] text-[#5a7090] font-[family-name:var(--font-mono)] uppercase tracking-[0.06em] mb-0.5">Earn Rate</div>
          <div className="text-[15px] font-bold font-[family-name:var(--font-mono)]" style={{ color: "oklch(0.70 0.20 250)" }}>{m.earnRate.toFixed(2)}x</div>
        </div>
        <div className="border-l border-[#1e2a3a] pl-3">
          <div className="text-[10px] text-[#5a7090] font-[family-name:var(--font-mono)] uppercase tracking-[0.06em] mb-0.5">Pt Value</div>
          <div className="text-[15px] font-bold font-[family-name:var(--font-mono)] text-[#e8f0f8]">Rp{m.pointValueIDR.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
