"use client";

import { useEffect, useState } from "react";
import { fetchAllMerchants } from "../lib/program";
import type { MerchantState } from "../types";

export function useMerchants() {
  const [merchants, setMerchants] = useState<MerchantState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAllMerchants()
      .then((data) => {
        if (!cancelled) {
          setMerchants(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch merchants");
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  return { merchants, loading, error };
}
