"use client";

import { useMemo, useState } from "react";
import { useMerchants } from "../hooks/useMerchants";
import MerchantCard from "../components/MerchantCard";

export default function MerchantsGrid() {
  const { merchants, loading, error } = useMerchants();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      merchants.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      ),
    [merchants, search]
  );

  return (
    <div className="max-w-[1100px] mx-auto px-8 pb-16 relative z-[1]">
      {/* Search bar */}
      <div className="flex items-center gap-3 mb-9">
        <div className="relative flex-none w-[260px]">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5a7090" strokeWidth="2" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Search merchants…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] text-[#e8f0f8] placeholder:text-[#5a7090] outline-none transition-all focus:border-[oklch(0.70_0.20_250)] focus:shadow-[0_0_0_3px_oklch(0.60_0.22_250_/_0.12)]"
            style={{ background: "#0d1117", border: "1px solid #1e2a3a" }}
          />
        </div>

        {!loading && (
          <span className="text-[12px] text-[#5a7090] font-[family-name:var(--font-mono)]">
            {filtered.length} merchant{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {loading && (
        <div className="text-center py-20 text-[#5a7090] font-[family-name:var(--font-mono)] text-[13px] animate-pulse">
          Fetching on-chain merchants…
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-[#e05a5a] font-[family-name:var(--font-mono)] text-[13px]">
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 text-[#5a7090] font-[family-name:var(--font-mono)] text-[13px]">
          No merchants found
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {filtered.map((m, i) => (
            <MerchantCard key={m.pubkey} m={m} delay={i * 30} />
          ))}
        </div>
      )}
    </div>
  );
}
