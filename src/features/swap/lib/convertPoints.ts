import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import type { ISolanaChain } from "@phantom/chain-interfaces";
import type { Brand } from "../types";
import { fetchMerchantState } from "./merchants";
import { getWebhook } from "./webhooks";

const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID ??
    "39Vs9sUx7gUY29PQtbKewaXaHQQnEHhqxyZ8kc7hoJQw",
);

// sha256("global:convert_points")[0..8]
const CONVERT_POINTS_DISCRIMINATOR = Buffer.from([
  0xeb, 0x33, 0xf1, 0xbb, 0x01, 0xab, 0x00, 0x11,
]);

const [PLATFORM_PDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("platform")],
  PROGRAM_ID,
);

const SYSTEM_PROGRAM_ID = new PublicKey("11111111111111111111111111111111");

export async function convertPoints(
  solana: ISolanaChain,
  userAddress: string,
  fromBrand: Brand,
  toBrand: Brand,
  amount: number,
  toAmt: number,
  fromBalance: number,
  toBalance: number,
): Promise<string> {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const user = new PublicKey(userAddress);
  const fromMerchant = new PublicKey(fromBrand.pubkey);
  const toMerchant = new PublicKey(toBrand.pubkey);

  const [fromState, toState] = await Promise.all([
    fetchMerchantState(connection, fromMerchant),
    fetchMerchantState(connection, toMerchant),
  ]);

  const fromMint = new PublicKey(fromState.pointsMint);
  const toMint = new PublicKey(toState.pointsMint);

  const userFromAta = getAssociatedTokenAddressSync(fromMint, user);
  const userToAta = getAssociatedTokenAddressSync(toMint, user);

  // amount in base units (6 decimals) — burn handles the mul inside the program
  // writeBigUInt64LE is missing from browser Buffer polyfills; use DataView instead
  const amountBuf = (() => {
    const arr = new Uint8Array(8);
    new DataView(arr.buffer).setBigUint64(0, BigInt(amount), true);
    return Buffer.from(arr);
  })();

  const data = Buffer.concat([CONVERT_POINTS_DISCRIMINATOR, amountBuf]);

  console.log("=== convertPoints context ===");
  console.log("[0] platform        :", PLATFORM_PDA.toBase58());
  console.log("[1] fromMerchant    :", fromMerchant.toBase58());
  console.log("[2] toMerchant      :", toMerchant.toBase58());
  console.log("[3] fromMint        :", fromMint.toBase58());
  console.log("[4] toMint          :", toMint.toBase58());
  console.log("[5] userFromAta     :", userFromAta.toBase58());
  console.log("[6] userToAta       :", userToAta.toBase58());
  console.log("[7] user (signer)   :", user.toBase58());
  console.log("[8] tokenProgram    :", TOKEN_PROGRAM_ID.toBase58());
  console.log("[9] assocTokenProg  :", ASSOCIATED_TOKEN_PROGRAM_ID.toBase58());
  console.log("[10] systemProgram  :", SYSTEM_PROGRAM_ID.toBase58());
  console.log("amount              :", amount);
  console.log("dataHex             :", data.toString("hex"));
  console.log("=============================");

  const keys = [
    { pubkey: PLATFORM_PDA, isSigner: false, isWritable: false },
    { pubkey: fromMerchant, isSigner: false, isWritable: true },
    { pubkey: toMerchant, isSigner: false, isWritable: true },
    { pubkey: fromMint, isSigner: false, isWritable: true },
    { pubkey: toMint, isSigner: false, isWritable: true },
    { pubkey: userFromAta, isSigner: false, isWritable: true },
    { pubkey: userToAta, isSigner: false, isWritable: true },
    { pubkey: user, isSigner: true, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: SYSTEM_PROGRAM_ID, isSigner: false, isWritable: false },
  ];

  const ix = new TransactionInstruction({ programId: PROGRAM_ID, keys, data });

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("confirmed");

  const tx = new Transaction({
    feePayer: user,
    blockhash,
    lastValidBlockHeight,
  }).add(ix);

  let signature: string | undefined;

  try {
    console.log("TX BEFORE SEND:", tx);

    const result = await solana.signAndSendTransaction(tx);

    console.log("RAW RESULT:", result);

    signature = result?.signature;
    console.log("SIGNATURE:", signature);
  } catch (err: any) {
    console.error("SIGN & SEND ERROR (raw):", err);
    console.error("message:", err?.message);
    console.error("logs:", err?.logs);
    console.error("stack:", err?.stack);

    throw err; // biar tidak silent
  }

  await connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed",
  );

  console.log("=== convertPoints SUCCESS ===");
  console.log("signature      :", signature);
  console.log("fromMerchant   :", fromMerchant.toBase58());
  console.log("toMerchant     :", toMerchant.toBase58());
  console.log("============================");

  const webhookTargets = [
    {
      label: "fromMerchant",
      pubkey: fromMerchant.toBase58(),
      points: fromBalance - amount,
    },
    {
      label: "toMerchant",
      pubkey: toMerchant.toBase58(),
      points: toBalance + toAmt,
    },
  ];

  await Promise.allSettled(
    webhookTargets
      .map(({ label, pubkey, points }) => {
        const base = getWebhook(pubkey);
        if (!base) return null;
        const url = `${base}${userAddress}`;
        console.log(`Webhook [${label}] → ${url}`);

        const payload = {
          network: "solana",
          signature,
          fromMerchant: fromMerchant.toBase58(),
          toMerchant: toMerchant.toBase58(),
          points,
        };

        return fetch(url, {
          method: "OPTIONS",
          headers: { Origin: window.location.origin },
        })
          .then((res) => {
            console.log(`Webhook [${label}] OPTIONS → ${res.status}`);
            const allowed = res.ok || res.status === 204;
            if (!allowed) {
              console.warn(
                `Webhook [${label}] blocked by CORS (${res.status}), skipping`,
              );
              return;
            }
            console.log(`Webhook [${label}] PATCH payload:`, payload);
            return fetch(url, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }).then((r) =>
              console.log(`Webhook [${label}] sent → ${r.status}`),
            );
          })
          .catch((err) => console.error(`Webhook [${label}] failed:`, err));
      })
      .filter(Boolean) as Promise<void>[],
  );

  return signature;
}
