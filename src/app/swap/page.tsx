import type { Metadata } from "next";
import Swap from "@/features/swap/sections/Swap";

export const metadata: Metadata = {
  title: "Swap — Oryon",
  description:
    "Swap your loyalty points for other assets on the Oryon network.",
};

export default function SwapPage() {
  return <Swap />;
}
