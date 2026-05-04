"use client";

import { useEffect, useState } from "react";
import type { Brand } from "../types";
import { fetchMerchants } from "../lib/merchants";

export function useMerchants() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    fetchMerchants()
      .then((items) => {
        if (!alive) return;
        setBrands(items);
        setError(null);
      })
      .catch((err) => {
        if (!alive) return;
        console.log("error 1", err);
        setError(
          err instanceof Error ? err.message : "Failed to load merchants",
        );
      })
      .finally(() => {
        if (!alive) return;
        setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { brands, isLoading, error };
}
