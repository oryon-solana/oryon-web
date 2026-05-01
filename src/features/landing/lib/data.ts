import { Globe, Layers, Lock, Zap } from "lucide-react";
import type { Feature, Partner, Stat, Step } from "../types";

export const STATS: Stat[] = [
  { v: "$1.2B", l: "On-chain Supply" },
  { v: "240+", l: "Loyalty Programs" },
  { v: "4.1M", l: "Active Wallets" },
];

export const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Sub-second swaps",
    desc: "Settle real-time conversions in under 400ms with predictable, near-zero fees.",
  },
  {
    icon: Globe,
    title: "Universal liquidity",
    desc: "Aggregate pools across 240+ loyalty programs — and route best price automatically.",
  },
  {
    icon: Lock,
    title: "Non-custodial",
    desc: "Your keys, your points. Audited contracts secured by formal verification.",
  },
  {
    icon: Layers,
    title: "Composable rewards",
    desc: "Stake, lend, or wrap loyalty assets into yield-bearing primitives.",
  },
];

export const STEPS: Step[] = [
  {
    num: "01",
    title: "Connect your loyalty wallet",
    desc: "Link any rewards account — airline miles, hotel points, retail credits — in seconds.",
  },
  {
    num: "02",
    title: "Tokenize & swap",
    desc: "Oryon mints your points as SPL tokens and routes swaps through the deepest pools.",
  },
  {
    num: "03",
    title: "Earn yield or redeem",
    desc: "Put idle points to work, or cash out at market rate — no lockups, no expiry.",
  },
];

export const PARTNERS: Partner[] = [
  "Binance",
  "Mastercard",
  "Airbnb",
  "Marriott",
  "Lufthansa",
  "Nubank",
  "Stripe",
  "Ondo",
];
