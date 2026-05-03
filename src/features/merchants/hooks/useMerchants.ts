"use client";

import { useEffect, useState } from "react";
import { fetchAllMerchants } from "@/features/partnership/lib/program";
import type { Merchant } from "../types";

export function useMerchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchAllMerchants()
      .then((data) => {
        if (cancelled) return;
        setMerchants(
          data.map((m) => ({
            pubkey: m.pubkey,
            name: m.name,
            earnRate: Number(m.earnRate) / 100,
            pointValueIDR: Number(m.pointValueIdr),
            active: m.isActive,
            totalPointsIssued: m.totalPointsIssued,
            totalPointsRedeemed: m.totalPointsRedeemed,
            merchantId: m.merchantId,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load merchants");
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { merchants, loading, error };
}
