"use client";

import { useEffect, useMemo, useState } from "react";
import { usePhantom } from "@phantom/react-sdk";
import { AddressType } from "@phantom/browser-sdk";
import { HISTORY_INIT, getBrand } from "../lib/brands";
import { getRate, calcConversion } from "../lib/rates";
import type { HistoryItem, ModalStatus } from "../types";
import { useMerchants } from "./useMerchants";
import { useWalletBalances } from "./useWalletBalances";

export function useSwap() {
  const { brands, isLoading, error: merchantsError } = useMerchants();
  const { addresses, isConnected } = usePhantom();
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [fromAmt, setFromAmt] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [modalStatus, setModalStatus] = useState<ModalStatus>("idle");
  const [modalOpen, setModalOpen] = useState(false);
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<HistoryItem[]>(HISTORY_INIT);
  const [error, setError] = useState("");

  const walletAddress = useMemo(() => {
    return (
      addresses.find((item) => item.addressType === AddressType.solana)?.address ||
      addresses[0]?.address ||
      ""
    );
  }, [addresses]);

  const {
    balances: walletBalances,
    isLoading: balancesLoading,
    error: balancesError,
  } = useWalletBalances(brands, isConnected ? walletAddress : "");

  useEffect(() => {
    if (!isConnected || brands.length === 0) {
      setBalances({});
      return;
    }
    setBalances(walletBalances);
  }, [brands, isConnected, walletBalances]);

  useEffect(() => {
    if (brands.length === 0) return;
    if (!fromId) setFromId(brands[0].id);
    if (!toId) setToId(brands[1]?.id ?? brands[0].id);
  }, [brands, fromId, toId]);

  const fromBrand = useMemo(
    () => getBrand(brands, fromId) ?? brands[0],
    [brands, fromId],
  );
  const toBrand = useMemo(
    () => getBrand(brands, toId) ?? brands[1] ?? brands[0],
    [brands, toId],
  );
  const rate = fromBrand && toBrand ? getRate(fromBrand, toBrand) : 0;
  const numAmt = parseFloat(fromAmt) || 0;
  const { fee, toAmt } = calcConversion(numAmt, rate);
  const hasAmt = numAmt > 0;
  const canConvert =
    !!fromBrand &&
    !!toBrand &&
    hasAmt &&
    !error &&
    isConnected &&
    numAmt <= (balances[fromId] ?? 0);

  function flip() {
    if (!fromBrand || !toBrand) return;
    setFlipping(true);
    setTimeout(() => {
      setFromId(toId);
      setToId(fromId);
      setFromAmt("");
      setError("");
      setFlipping(false);
    }, 200);
  }

  function changeFrom(id: string) {
    if (id === toId) setToId(fromId);
    setFromId(id);
    setFromAmt("");
    setError("");
  }

  function changeTo(id: string) {
    if (id === fromId) setFromId(toId);
    setToId(id);
    setError("");
  }

  function inputAmt(val: string) {
    setError("");
    if (val === "" || /^\d*$/.test(val)) {
      setFromAmt(val);
      const n = parseInt(val) || 0;
      if (n > (balances[fromId] ?? 0)) setError("Insufficient balance");
    }
  }

  function openModal() {
    setModalOpen(true);
    setModalStatus("idle");
  }

  function closeModal() {
    setModalOpen(false);
    setModalStatus("idle");
  }

  function confirm() {
    if (!fromBrand || !toBrand) return;
    setModalStatus("loading");
    setTimeout(() => {
      setBalances((prev) => ({
        ...prev,
        [fromId]: (prev[fromId] ?? 0) - numAmt,
        [toId]: (prev[toId] ?? 0) + toAmt,
      }));
      setHistory((prev) => [
        {
          id: Date.now(),
          from: fromId,
          to: toId,
          fromAmt: numAmt,
          toAmt,
          date: "Today",
        },
        ...prev,
      ]);
      setFromAmt("");
      setModalStatus("success");
    }, 1800);
  }

  return {
    brands,
    isLoading,
    balancesLoading,
    balancesError,
    isConnected,
    merchantsError,
    isReady: !!fromBrand && !!toBrand,
    fromId,
    toId,
    fromAmt,
    flipping,
    error,
    fromBrand: fromBrand!,
    toBrand: toBrand!,
    rate,
    numAmt,
    fee,
    toAmt,
    hasAmt,
    canConvert,
    balances,
    history,
    modalOpen,
    modalStatus,
    flip,
    changeFrom,
    changeTo,
    inputAmt,
    openModal,
    closeModal,
    confirm,
  };
}
