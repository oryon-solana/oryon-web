import { FEE } from "./theme";

const RATES: Record<string, number> = {
  "mcdonalds-starbucks": 0.66,
  "mcdonalds-kfc": 0.9,
  "starbucks-mcdonalds": 1.5,
  "starbucks-kfc": 1.4,
  "kfc-mcdonalds": 1.12,
  "kfc-starbucks": 0.7,
};

export function getRate(a: string, b: string): number {
  const forward = RATES[`${a}-${b}`];
  if (forward !== undefined) return forward;
  const inverse = RATES[`${b}-${a}`];
  return inverse ? +(1 / inverse).toFixed(4) : 0.75;
}

export function calcConversion(numAmt: number, rate: number) {
  const fee = Math.round(numAmt * FEE);
  const toAmt = Math.round((numAmt - fee) * rate);
  return { fee, toAmt };
}
