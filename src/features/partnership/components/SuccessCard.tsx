import Link from "next/link";
import type { PartnershipFormData } from "../types";

interface Props {
  form: PartnershipFormData;
  onReset: () => void;
}

export default function SuccessCard({ form, onReset }: Props) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] p-8 relative z-[1]">
      <div
        className="rounded-[28px] px-12 py-14 max-w-[460px] w-full text-center animate-slide-up"
        style={{ background: "#0d1117", border: "1px solid #1e2a3a", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
      >
        <div
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-7 animate-check-pop"
          style={{ background: "oklch(0.65 0.18 155 / 0.15)", border: "1px solid oklch(0.65 0.18 155)" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="oklch(0.65 0.18 155)" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-[26px] font-bold text-[#e8f0f8] mb-2.5 tracking-tight">Application Submitted!</h2>
        <p className="text-[15px] text-[#5a7090] leading-relaxed mb-2">
          <strong className="text-[#e8f0f8]">{form.name}</strong> has been added to the review queue.
        </p>
        <p className="text-[13px] text-[#5a7090] mb-9">Our team will review your application and reach out within 3–5 business days.</p>

        <div
          className="rounded-2xl p-4 mb-7 text-left"
          style={{ background: "#161e2a", border: "1px solid #1e2a3a" }}
        >
          {[
            ["Merchant", form.name],
            ["Earn Rate", `${form.earnRate}x per transaction`],
            ["Point Value", `Rp ${Number(form.pointValueIDR).toLocaleString("id-ID")} / point`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-[13px] mb-2 last:mb-0">
              <span className="text-[#5a7090]">{k}</span>
              <span className="text-[#e8f0f8] font-semibold font-[family-name:var(--font-mono)] text-[12px]">{v}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={onReset}
            className="flex-1 py-3.5 rounded-xl border-[1.5px] border-[#1e2a3a] text-[13px] font-semibold text-[#7a90a8] bg-transparent transition-colors hover:text-[#e8f0f8] hover:border-[#2a3a50] cursor-pointer"
          >
            Add Another
          </button>
          <Link
            href="/merchants"
            className="flex-[2] py-3.5 rounded-xl text-[13px] font-bold text-white flex items-center justify-center transition-all bg-primary hover:bg-[oklch(0.70_0.20_250)] hover:shadow-[0_0_24px_oklch(0.60_0.22_250_/_0.3)] hover:-translate-y-px"
          >
            View Merchants →
          </Link>
        </div>
      </div>
    </div>
  );
}
