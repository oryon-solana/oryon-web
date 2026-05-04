import type { Brand } from "../types";

const FEE_BPS = 100; // 1%

// 1 fromPoint = pointValueIdr IDR → earnRate IDR buys 1 toPoint
// rate = fromBrand.pointValueIdr / toBrand.earnRate
export function getRate(from: Brand, to: Brand): number {
  if (!from.pointValueIdr || !to.earnRate) return 0;
  return Number((from.pointValueIdr / to.earnRate).toFixed(4));
}

export function calcConversion(
  amount: number,
  rate: number,
): { fee: number; toAmt: number } {
  const gross = amount * rate;
  const fee = Math.ceil(gross * (FEE_BPS / 10000));
  const toAmt = Math.floor(gross - fee);
  return { fee, toAmt };
}
