"use client";

import { useState, useEffect, useRef } from "react";
import { T } from "../lib/theme";
import type { Brand } from "../types";

type Props = {
  brands: Brand[];
  selected: string;
  onChange: (id: string) => void;
  exclude: string;
};

export function BrandDropdown({ brands, selected, onChange, exclude }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const brand = brands.find((b) => b.id === selected) ?? brands[0];

  if (!brand) {
    return (
      <div className="rounded-xl px-3.5 py-3" style={{ background: T.n800 }}>
        <div className="text-[12px]" style={{ color: T.n400 }}>
          Loading merchants...
        </div>
      </div>
    );
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
          <div className="text-[15px] font-semibold" style={{ color: T.white }}>
            {brand.name}
          </div>
          <div className="text-[11px] font-mono" style={{ color: T.n300 }}>
            {brand.unit}
          </div>
        </div>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke={T.n400}
          strokeWidth="2"
          strokeLinecap="round"
          className="flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-[14px] z-50 overflow-hidden"
          style={{
            background: T.n850,
            border: `1px solid ${T.n700}`,
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          }}
        >
          {brands
            .filter((b) => b.id !== exclude)
            .map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  onChange(b.id);
                  setOpen(false);
                }}
                className="flex items-center gap-2.5 w-full px-3.5 py-[11px] border-none cursor-pointer transition-colors duration-100"
                style={{
                  background: b.id === selected ? T.n700 : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (b.id !== selected)
                    e.currentTarget.style.background = T.n800;
                }}
                onMouseLeave={(e) => {
                  if (b.id !== selected)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {b.logo(24)}
                <div className="text-left">
                  <div
                    className="text-[13px] font-semibold"
                    style={{ color: T.white }}
                  >
                    {b.name}
                  </div>
                  <div
                    className="text-[11px] font-mono"
                    style={{ color: T.n400 }}
                  >
                    {b.unit}
                  </div>
                </div>
                {b.id === selected && (
                  <svg
                    className="ml-auto"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={T.blue4}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
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
