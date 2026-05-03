"use client";

import { useState } from "react";
import { usePhantom } from "@phantom/react-sdk";
import { AddressType } from "@phantom/browser-sdk";
import { PublicKey, Transaction } from "@solana/web3.js";
import { buildRegisterMerchantIx, connection } from "../lib/program";
import type {
  PartnershipFormData,
  PartnershipFormErrors,
  PartnershipFocusState,
  PartnershipFormStatus,
} from "../types";

type PhantomSolana = {
  signAndSendTransaction: (tx: Transaction) => Promise<{ signature: string }>;
};

function getPhantomSolana(): PhantomSolana | undefined {
  return (window as unknown as { phantom?: { solana?: PhantomSolana } }).phantom
    ?.solana;
}

export function usePartnershipForm() {
  const { isConnected, addresses } = usePhantom();
  const [form, setForm] = useState<PartnershipFormData>({
    name: "",
    earnRate: "",
    pointValueIDR: "",
  });
  const [errors, setErrors] = useState<PartnershipFormErrors>({});
  const [focused, setFocused] = useState<PartnershipFocusState>({});
  const [status, setStatus] = useState<PartnershipFormStatus>("idle");
  const [txError, setTxError] = useState<string | null>(null);

  const walletAddress =
    addresses.find((a) => a.addressType === AddressType.solana)?.address ||
    addresses[0]?.address ||
    "";

  function validate(): PartnershipFormErrors {
    const e: PartnershipFormErrors = {};
    if (!form.name.trim()) e.name = "Merchant name is required";
    if (!form.earnRate) e.earnRate = "Earn rate is required";
    else if (isNaN(Number(form.earnRate)) || Number(form.earnRate) <= 0)
      e.earnRate = "Must be a positive number";
    if (!form.pointValueIDR) e.pointValueIDR = "Point value is required";
    else if (
      isNaN(Number(form.pointValueIDR)) ||
      Number(form.pointValueIDR) <= 0
    )
      e.pointValueIDR = "Must be a positive integer";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!isConnected || !walletAddress) {
      setTxError("Connect your wallet first.");
      return;
    }

    setStatus("loading");
    setTxError(null);

    try {
      console.log("1");
      const provider = getPhantomSolana();
      if (!provider)
        throw new Error(
          "Phantom wallet not found. Make sure the extension is installed.",
        );

      const authority = new PublicKey(walletAddress);
      const ix = buildRegisterMerchantIx(
        authority,
        form.name.trim(),
        Number(form.earnRate),
        Number(form.pointValueIDR),
      );
      console.log("2");

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      const tx = new Transaction({
        blockhash,
        lastValidBlockHeight,
        feePayer: authority,
      });
      tx.add(ix);
      console.log("3");

      const { signature } = await provider.signAndSendTransaction(tx);

      console.log("SIGNATURE:", signature);

      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        "confirmed",
      );
      console.log("4");

      setStatus("success");
    } catch (err) {
      console.log("Transaction error:", err);
      setStatus("idle");
      const msg = err instanceof Error ? err.message : "Transaction failed.";
      // Shorten wallet-rejected messages
      setTxError(
        msg.includes("User rejected") ? "Transaction cancelled." : msg,
      );
    }
  }

  function handleChange(key: keyof PartnershipFormData, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
    if (txError) setTxError(null);
  }

  function focus(key: keyof PartnershipFormData) {
    setFocused((p) => ({ ...p, [key]: true }));
  }

  function blur(key: keyof PartnershipFormData) {
    setFocused((p) => ({ ...p, [key]: false }));
  }

  function reset() {
    setStatus("idle");
    setForm({ name: "", earnRate: "", pointValueIDR: "" });
    setErrors({});
    setTxError(null);
  }

  return {
    form,
    errors,
    focused,
    status,
    txError,
    isConnected,
    walletAddress,
    handleSubmit,
    handleChange,
    focus,
    blur,
    reset,
  };
}
