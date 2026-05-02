import { cn } from "@/lib/utils";
import type { PartnershipFormData, PartnershipFormErrors, PartnershipFocusState, PartnershipFormStatus } from "../types";

interface Props {
  form: PartnershipFormData;
  errors: PartnershipFormErrors;
  focused: PartnershipFocusState;
  status: PartnershipFormStatus;
  onChange: (key: keyof PartnershipFormData, val: string) => void;
  onFocus: (key: keyof PartnershipFormData) => void;
  onBlur: (key: keyof PartnershipFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function inputCls(isFocused: boolean, hasError: boolean) {
  return cn(
    "w-full px-4 py-3.5 rounded-xl text-[15px] text-[#e8f0f8] bg-[#161e2a] outline-none transition-all placeholder:text-[#5a7090]",
    "border-[1.5px]",
    hasError ? "border-red-500" : isFocused ? "border-[oklch(0.70_0.20_250)]" : "border-[#1e2a3a]"
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-1.5">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 shrink-0">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span className="text-[11px] font-medium text-red-400">{msg}</span>
    </div>
  );
}

export default function ApplicationForm({ form, errors, focused, status, onChange, onFocus, onBlur, onSubmit }: Props) {
  const hasPreview = !!(form.name || form.earnRate || form.pointValueIDR);

  return (
    <div className="animate-slide-up" style={{ animationDelay: "50ms" }}>
      <div
        className="rounded-3xl p-8 md:p-9"
        style={{ background: "#0d1117", border: "1px solid #1e2a3a", boxShadow: "0 8px 48px rgba(0,0,0,0.4)" }}
      >
        <h2 className="text-xl font-bold text-[#e8f0f8] mb-1 tracking-tight">Merchant Application</h2>
        <p className="text-[13px] text-[#5a7090] mb-8">Fill in your brand details to get listed.</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#a0b4c8] tracking-[0.01em]">Merchant Name</label>
            <input
              type="text"
              placeholder="e.g. Burger King"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
              onFocus={() => onFocus("name")}
              onBlur={() => onBlur("name")}
              className={inputCls(!!focused.name, !!errors.name)}
              style={focused.name && !errors.name ? { boxShadow: "0 0 0 3px oklch(0.60 0.22 250 / 0.12)" } : undefined}
            />
            <FieldError msg={errors.name} />
          </div>

          {/* Earn Rate */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <label className="text-[13px] font-semibold text-[#a0b4c8] tracking-[0.01em]">Earn Rate</label>
              <span className="text-[11px] text-[#5a7090] font-[family-name:var(--font-mono)]">points per transaction</span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="e.g. 1.5"
                value={form.earnRate}
                onChange={(e) => onChange("earnRate", e.target.value)}
                onFocus={() => onFocus("earnRate")}
                onBlur={() => onBlur("earnRate")}
                className={cn(inputCls(!!focused.earnRate, !!errors.earnRate), "pr-11")}
                style={focused.earnRate && !errors.earnRate ? { boxShadow: "0 0 0 3px oklch(0.60 0.22 250 / 0.12)" } : undefined}
              />
              <span
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold font-[family-name:var(--font-mono)]"
                style={{ color: "oklch(0.70 0.20 250)" }}
              >×</span>
            </div>
            <p className="text-[11px] text-[#5a7090] font-[family-name:var(--font-mono)]">Users earn this many points per 1 transaction unit</p>
            <FieldError msg={errors.earnRate} />
          </div>

          {/* Point Value IDR */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <label className="text-[13px] font-semibold text-[#a0b4c8] tracking-[0.01em]">Point Value (IDR)</label>
              <span className="text-[11px] text-[#5a7090] font-[family-name:var(--font-mono)]">Rupiah per point</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold font-[family-name:var(--font-mono)] text-[#5a7090] select-none">Rp</span>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 100"
                value={form.pointValueIDR}
                onChange={(e) => onChange("pointValueIDR", e.target.value)}
                onFocus={() => onFocus("pointValueIDR")}
                onBlur={() => onBlur("pointValueIDR")}
                className={cn(inputCls(!!focused.pointValueIDR, !!errors.pointValueIDR), "pl-10")}
                style={focused.pointValueIDR && !errors.pointValueIDR ? { boxShadow: "0 0 0 3px oklch(0.60 0.22 250 / 0.12)" } : undefined}
              />
            </div>
            <p className="text-[11px] text-[#5a7090] font-[family-name:var(--font-mono)]">Monetary value assigned to each loyalty point</p>
            <FieldError msg={errors.pointValueIDR} />
          </div>

          <div className="border-t border-[#161e2a] my-1" />

          {/* Live Preview */}
          {hasPreview && (
            <div
              className="rounded-2xl p-4 animate-fade-in"
              style={{ background: "#161e2a", border: "1px solid #1e2a3a" }}
            >
              <div className="text-[10px] font-[family-name:var(--font-mono)] text-[#5a7090] tracking-[0.1em] uppercase mb-3">Preview</div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#1e2a3a] flex items-center justify-center shrink-0 text-lg">🏪</div>
                <div>
                  <div className="text-[15px] font-bold text-[#e8f0f8] mb-0.5">{form.name || "Your Brand"}</div>
                  <div className="text-[11px] text-[#5a7090] font-[family-name:var(--font-mono)]">Loyalty Program</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 rounded-xl p-3" style={{ background: "#0d1117" }}>
                <div>
                  <div className="text-[9px] text-[#5a7090] font-[family-name:var(--font-mono)] uppercase tracking-[0.06em] mb-0.5">Earn Rate</div>
                  <div className="text-base font-bold font-[family-name:var(--font-mono)]" style={{ color: "oklch(0.70 0.20 250)" }}>{form.earnRate || "—"}×</div>
                </div>
                <div className="border-l border-[#1e2a3a] pl-3">
                  <div className="text-[9px] text-[#5a7090] font-[family-name:var(--font-mono)] uppercase tracking-[0.06em] mb-0.5">Pt Value</div>
                  <div className="text-base font-bold font-[family-name:var(--font-mono)] text-[#e8f0f8]">
                    {form.pointValueIDR ? `Rp${Number(form.pointValueIDR).toLocaleString("id-ID")}` : "—"}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "w-full py-4 mt-1 rounded-2xl text-[15px] font-bold tracking-[0.01em] transition-all flex items-center justify-center gap-2",
              status === "loading"
                ? "bg-[#1e2a3a] text-[#5a7090] cursor-not-allowed"
                : "bg-primary text-white hover:bg-[oklch(0.70_0.20_250)] hover:shadow-[0_0_32px_oklch(0.60_0.22_250_/_0.3)] hover:-translate-y-px cursor-pointer"
            )}
          >
            {status === "loading" ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-[#2a3a50] border-t-primary animate-spin" />
                Submitting…
              </>
            ) : (
              "Add Your Merchant Today →"
            )}
          </button>
        </form>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5a7090" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className="text-[12px] text-[#5a7090] font-[family-name:var(--font-mono)] tracking-[0.02em]">
          Secure submission · No credit card required
        </span>
      </div>
    </div>
  );
}
