"use client";

import { useSwap } from "../hooks/useSwap";
import { SwapCard } from "../components/SwapCard";
import { SwapModal } from "../components/SwapModal";
import { BalancePreview } from "../components/BalancePreview";

export default function Swap() {
  const s = useSwap();

  if (!s.isReady) return null;

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-[480px]">
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
      </div>
    </div>
  );
}
