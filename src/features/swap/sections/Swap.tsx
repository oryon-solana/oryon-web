"use client";

import { useSwap } from "../hooks/useSwap";
import { SwapCard } from "../components/SwapCard";
import { SwapModal } from "../components/SwapModal";
import { BalancePreview } from "../components/BalancePreview";
import { T } from "../lib/theme";

export default function Swap() {
  const s = useSwap();

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-[480px]">
        {s.isLoading && (
          <div
            className="rounded-3xl p-6 mb-4 animate-pulse"
            style={{ background: T.n900, border: `1px solid ${T.n800}` }}
          >
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl p-5" style={{ background: T.n800 }}>
                <div className="h-3 w-16 rounded mb-4" style={{ background: T.n700 }} />
                <div className="h-10 rounded-xl" style={{ background: T.n700 }} />
                <div className="h-14 rounded-xl mt-3" style={{ background: T.n700 }} />
              </div>
              <div className="h-10 w-10 rounded-full self-center" style={{ background: T.n800 }} />
              <div className="rounded-2xl p-5" style={{ background: T.n800 }}>
                <div className="h-3 w-16 rounded mb-4" style={{ background: T.n700 }} />
                <div className="h-10 rounded-xl" style={{ background: T.n700 }} />
                <div className="h-14 rounded-xl mt-3" style={{ background: T.n700 }} />
              </div>
              <div className="h-14 rounded-[14px]" style={{ background: T.n800 }} />
            </div>
          </div>
        )}

        {!s.isLoading && s.merchantsError && (
          <div
            className="rounded-3xl p-8 text-center"
            style={{ background: T.n900, border: `1px solid ${T.n800}` }}
          >
            <p className="text-sm font-mono" style={{ color: T.red }}>
              Failed to load merchants
            </p>
            <p className="text-xs mt-1" style={{ color: T.n400 }}>
              {s.merchantsError}
            </p>
          </div>
        )}

        {!s.isLoading && !s.merchantsError && s.brands.length === 0 && (
          <div
            className="rounded-3xl p-8 text-center"
            style={{ background: T.n900, border: `1px solid ${T.n800}` }}
          >
            <p className="text-sm font-mono" style={{ color: T.n400 }}>
              No active merchants found on-chain.
            </p>
          </div>
        )}

        {s.isReady && (
          <>
            {s.hasAmt && !s.error && (
              <BalancePreview
                fromBrand={s.fromBrand}
                toBrand={s.toBrand}
                balances={s.balances}
                numAmt={s.numAmt}
                toAmt={s.toAmt}
              />
            )}
            <SwapCard
              brands={s.brands}
              fromId={s.fromId}
              toId={s.toId}
              fromAmt={s.fromAmt}
              toAmt={s.toAmt}
              fromBrand={s.fromBrand}
              toBrand={s.toBrand}
              balances={s.balances}
              error={s.error}
              flipping={s.flipping}
              rate={s.rate}
              fee={s.fee}
              hasAmt={s.hasAmt}
              canConvert={s.canConvert}
              onFromChange={s.changeFrom}
              onToChange={s.changeTo}
              onAmtInput={s.inputAmt}
              onFlip={s.flip}
              onOpenModal={s.openModal}
            />
            <SwapModal
              show={s.modalOpen}
              status={s.modalStatus}
              fromBrand={s.fromBrand}
              toBrand={s.toBrand}
              fromAmt={s.fromAmt}
              toAmt={s.toAmt}
              rate={s.rate}
              fee={s.fee}
              onClose={s.closeModal}
              onConfirm={s.confirm}
            />
          </>
        )}
      </div>
    </div>
  );
}
