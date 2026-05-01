import { T } from "../lib/theme";
import type { Brand, ModalStatus } from "../types";

type Props = {
  show: boolean;
  status: ModalStatus;
  fromBrand: Brand;
  toBrand: Brand;
  fromAmt: string;
  toAmt: number;
  rate: number;
  fee: number;
  onClose: () => void;
  onConfirm: () => void;
};

export function SwapModal({
  show,
  status,
  fromBrand,
  toBrand,
  fromAmt,
  toAmt,
  rate,
  fee,
  onClose,
  onConfirm,
}: Props) {
  if (!show) return null;

  const unitFrom = fromBrand.unit.replace(/s$/, "");
  const unitTo = toBrand.unit.replace(/s$/, "");

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[200]"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget && status === "idle") onClose();
      }}
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
          <IdleView
            fromBrand={fromBrand}
            toBrand={toBrand}
            fromAmt={fromAmt}
            toAmt={toAmt}
            rate={rate}
            fee={fee}
            unitFrom={unitFrom}
            unitTo={unitTo}
            onClose={onClose}
            onConfirm={onConfirm}
          />
        )}
        {status === "loading" && <LoadingView />}
        {status === "success" && (
          <SuccessView
            fromBrand={fromBrand}
            toBrand={toBrand}
            fromAmt={fromAmt}
            toAmt={toAmt}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

function IdleView({
  fromBrand,
  toBrand,
  fromAmt,
  toAmt,
  rate,
  fee,
  unitFrom,
  unitTo,
  onClose,
  onConfirm,
}: {
  fromBrand: Brand;
  toBrand: Brand;
  fromAmt: string;
  toAmt: number;
  rate: number;
  fee: number;
  unitFrom: string;
  unitTo: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center"
          style={{ background: T.blueDim, border: `1px solid ${T.blueBorder}` }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={T.blue4}
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
        <h3 className="text-[19px] font-bold" style={{ color: T.white }}>
          Confirm Conversion
        </h3>
      </div>
      <p className="text-[13px] mb-7 pl-[46px]" style={{ color: T.n400 }}>
        Review the details below before converting.
      </p>

      <div
        className="rounded-2xl p-5 mb-5"
        style={{ background: T.n800, border: `1px solid ${T.n700}` }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="text-center">
            {fromBrand.logo(36)}
            <div className="text-[11px] mt-1.5" style={{ color: T.n400 }}>
              {fromBrand.name}
            </div>
            <div
              className="text-[22px] font-bold font-mono"
              style={{ color: T.white }}
            >
              {Number(fromAmt).toLocaleString()}
            </div>
            <div className="text-[10px]" style={{ color: T.n400 }}>
              {fromBrand.unit}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-px" style={{ background: T.n600 }} />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={T.blue4}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <div className="w-8 h-px" style={{ background: T.n600 }} />
          </div>
          <div className="text-center">
            {toBrand.logo(36)}
            <div className="text-[11px] mt-1.5" style={{ color: T.n400 }}>
              {toBrand.name}
            </div>
            <div
              className="text-[22px] font-bold font-mono"
              style={{ color: T.green }}
            >
              {toAmt.toLocaleString()}
            </div>
            <div className="text-[10px]" style={{ color: T.n400 }}>
              {toBrand.unit}
            </div>
          </div>
        </div>

        {[
          ["Exchange rate", `1 ${unitFrom} = ${rate} ${unitTo}`],
          ["Service fee (1.5%)", `${fee.toLocaleString()} ${fromBrand.unit}`],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between text-[12px] mb-1.5 font-mono"
            style={{ color: T.n400 }}
          >
            <span>{k}</span>
            <span style={{ color: T.n200 }}>{v}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2.5">
        <button
          onClick={onClose}
          className="flex-1 py-[13px] rounded-xl text-[13px] font-semibold cursor-pointer transition-all duration-150"
          style={{
            border: `1.5px solid ${T.n700}`,
            background: "transparent",
            color: T.n300,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.n600;
            e.currentTarget.style.color = T.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = T.n700;
            e.currentTarget.style.color = T.n300;
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-[2] py-[13px] rounded-xl border-none text-[13px] font-bold cursor-pointer tracking-[0.02em] text-white transition-all duration-200"
          style={{ background: T.blue }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = T.blue4;
            e.currentTarget.style.boxShadow = `0 0 24px ${T.blueGlow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = T.blue;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Confirm Convert →
        </button>
      </div>
    </>
  );
}

function LoadingView() {
  return (
    <div className="text-center py-12">
      <div
        className="w-[52px] h-[52px] rounded-full mx-auto mb-6 animate-spin"
        style={{ border: `3px solid ${T.n700}`, borderTopColor: T.blue4 }}
      />
      <div
        className="text-[17px] font-semibold mb-1.5"
        style={{ color: T.white }}
      >
        Processing…
      </div>
      <div className="text-[13px] font-mono" style={{ color: T.n400 }}>
        Settling on-chain
      </div>
    </div>
  );
}

function SuccessView({
  fromBrand,
  toBrand,
  fromAmt,
  toAmt,
  onClose,
}: {
  fromBrand: Brand;
  toBrand: Brand;
  fromAmt: string;
  toAmt: number;
  onClose: () => void;
}) {
  return (
    <div className="text-center py-4">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: T.greenDim, border: `1px solid ${T.green}` }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={T.green}
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="text-[22px] font-bold mb-2" style={{ color: T.white }}>
        Conversion Complete
      </h3>
      <p className="text-[14px] mb-7" style={{ color: T.n400 }}>
        You received{" "}
        <strong style={{ color: T.green }}>
          {toAmt.toLocaleString()} {toBrand.unit}
        </strong>
      </p>
      <div className="flex gap-3 justify-center mb-7">
        {(
          [
            {
              brand: fromBrand,
              value: `−${Number(fromAmt).toLocaleString()}`,
              clr: T.red,
            },
            {
              brand: toBrand,
              value: `+${toAmt.toLocaleString()}`,
              clr: T.green,
            },
          ] as const
        ).map(({ brand, value, clr }) => (
          <div
            key={brand.id}
            className="rounded-[14px] px-5 py-3.5 text-center"
            style={{ background: T.n800, border: `1px solid ${T.n700}` }}
          >
            {brand.logo(24)}
            <div className="text-[11px] mt-1.5" style={{ color: T.n400 }}>
              {brand.name}
            </div>
            <div
              className="text-[17px] font-bold font-mono"
              style={{ color: clr }}
            >
              {value}
            </div>
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
  );
}
