import type { Brand } from "../types";

const FEE_BPS = 100; // 1% — matches platform.conversion_fee_bps on devnet

// Display rate: 1 from-point = N to-points
// Matches the program: to_points = total_idr / to.point_value_idr
export function getRate(from: Brand, to: Brand): number {
  if (!from.pointValueIdr || !to.pointValueIdr) return 0;
  return Number((from.pointValueIdr / to.pointValueIdr).toFixed(4));
}

// Replicates exact program integer arithmetic:
//   total_idr        = amount * from.pointValueIdr
//   value_after_fee  = total_idr * (10000 - fee_bps) / 10000  (floor)
//   to_points        = value_after_fee / to.pointValueIdr      (floor)
//   fee display      = total_idr - value_after_fee (in IDR), expressed as from-points
export function calcConversion(
  amount: number,
  from: Brand,
  to: Brand,
): { fee: number; toAmt: number } {
  if (!from.pointValueIdr || !to.pointValueIdr || amount <= 0) {
    return { fee: 0, toAmt: 0 };
  }
  const totalIdr = amount * from.pointValueIdr;
  const valueAfterFee = Math.floor((totalIdr * (10000 - FEE_BPS)) / 10000);
  const toAmt = Math.floor(valueAfterFee / to.pointValueIdr);
  const feeIdr = totalIdr - valueAfterFee;
  const fee = feeIdr / from.pointValueIdr; // expressed in from-points
  return { fee, toAmt };
}
