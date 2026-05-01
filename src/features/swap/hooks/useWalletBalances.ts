"use client";

import { useEffect, useState } from "react";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  type ParsedAccountData,
} from "@solana/web3.js";
import type { Brand } from "../types";

const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
);

type State = {
  balances: Record<string, number>;
  isLoading: boolean;
  error: string | null;
};

export function useWalletBalances(
  brands: Brand[],
  ownerAddress: string,
): State {
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    if (!ownerAddress || brands.length === 0) {
      setBalances({});
      setIsLoading(false);
      setError(null);
      return () => {
        alive = false;
      };
    }

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const owner = new PublicKey(ownerAddress);
        const accounts = await connection.getParsedTokenAccountsByOwner(owner, {
          programId: TOKEN_PROGRAM_ID,
        });

        const byMint = new Map<string, number>();
        for (const account of accounts.value) {
          const parsed = account.account.data as ParsedAccountData;
          const info = parsed.parsed?.info as
            | {
                mint?: string;
                tokenAmount?: { uiAmount?: number | null };
              }
            | undefined;
          const mint = info?.mint;
          if (!mint) continue;
          const amount = info?.tokenAmount?.uiAmount ?? 0;
          byMint.set(mint, amount);
        }

        const next = Object.fromEntries(
          brands.map((brand) => [brand.id, byMint.get(brand.pointsMint) ?? 0]),
        );

        if (alive) setBalances(next);
      } catch (err) {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "Failed to load balances");
      } finally {
        if (alive) setIsLoading(false);
      }
    };

    load();

    return () => {
      alive = false;
    };
  }, [brands, ownerAddress]);

  return { balances, isLoading, error };
}
