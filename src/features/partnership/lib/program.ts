import {
  Connection,
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  clusterApiUrl,
} from "@solana/web3.js";
import bs58 from "bs58";
import type { MerchantState } from "../types";

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID ?? "11111111111111111111111111111111",
);

// SPL Token Program
const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
);

export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Anchor discriminator for register_merchant instruction: sha256("global:register_merchant")[0:8]
const DISCRIMINATOR = Buffer.from([238, 245, 77, 132, 161, 88, 216, 248]);

async function getMerchantStateDiscriminator(): Promise<Uint8Array> {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode("account:MerchantState"),
  );
  return new Uint8Array(hash).slice(0, 8);
}

function readPubkey(buf: Buffer, offset: number): string {
  return new PublicKey(buf.subarray(offset, offset + 32)).toBase58();
}

function readU64LE(buf: Buffer, offset: number): bigint {
  return buf.readBigUInt64LE(offset);
}

function decodeMerchantState(pubkey: string, data: Buffer): MerchantState {
  let o = 8; // skip 8-byte discriminator
  const platform = readPubkey(data, o);
  o += 32;
  const authority = readPubkey(data, o);
  o += 32;
  const nameLen = data.readUInt32LE(o);
  o += 4;
  const name = data.subarray(o, o + nameLen).toString("utf-8");
  o += nameLen;
  const pointsMint = readPubkey(data, o);
  o += 32;
  const earnRate = readU64LE(data, o);
  o += 8;
  const pointValueIdr = readU64LE(data, o);
  o += 8;
  const isActive = data[o] !== 0;
  o += 1;
  const totalPointsIssued = readU64LE(data, o);
  o += 8;
  const totalPointsRedeemed = readU64LE(data, o);
  o += 8;
  const merchantId = data.readUInt32LE(o);
  o += 4;
  const bump = data[o];
  o += 1;
  const mintBump = data[o];

  return {
    pubkey,
    platform,
    authority,
    name,
    pointsMint,
    earnRate,
    pointValueIdr,
    isActive,
    totalPointsIssued,
    totalPointsRedeemed,
    merchantId,
    bump,
    mintBump,
  };
}

export async function fetchAllMerchants(): Promise<MerchantState[]> {
  const discriminator = await getMerchantStateDiscriminator();
  const accounts = await connection.getProgramAccounts(PROGRAM_ID, {
    filters: [{ memcmp: { offset: 0, bytes: bs58.encode(discriminator) } }],
  });
  return accounts.map(({ pubkey, account }) =>
    decodeMerchantState(pubkey.toBase58(), account.data as Buffer),
  );
}

function writeBigUInt64LE(value: bigint): Uint8Array {
  const buf = new ArrayBuffer(8);
  new DataView(buf).setBigUint64(0, value, true);
  return new Uint8Array(buf);
}

// earnRate is stored as basis points (1.5 → 150) so u64 can hold decimal rates
function encodeArgs(
  name: string,
  earnRateBps: bigint,
  pointValueIDR: bigint,
): Buffer {
  const nameBytes = Buffer.from(name, "utf-8");
  const nameLenBuf = Buffer.allocUnsafe(4);
  nameLenBuf.writeUInt32LE(nameBytes.length, 0);

  return Buffer.concat([
    DISCRIMINATOR,
    nameLenBuf,
    nameBytes,
    writeBigUInt64LE(earnRateBps),
    writeBigUInt64LE(pointValueIDR),
  ]);
}

export function findPlatformPDA(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("platform")],
    PROGRAM_ID,
  );
}

export function findMerchantPDA(authority: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("merchant"), authority.toBuffer()],
    PROGRAM_ID,
  );
}

export function findMintPDA(authority: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("mint"), authority.toBuffer()],
    PROGRAM_ID,
  );
}

export function buildRegisterMerchantIx(
  authority: PublicKey,
  name: string,
  earnRate: number, // decimal, e.g. 1.5
  pointValueIDR: number,
): TransactionInstruction {
  const [platform] = findPlatformPDA();
  const [merchant] = findMerchantPDA(authority);
  const [pointsMint] = findMintPDA(authority);

  // earnRate stored as basis points: 1.5 → 150
  const earnRateBps = BigInt(Math.round(earnRate * 100));
  const pointValueBig = BigInt(Math.round(pointValueIDR));

  return new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: platform, isSigner: false, isWritable: true },
      { pubkey: merchant, isSigner: false, isWritable: true },
      { pubkey: pointsMint, isSigner: false, isWritable: true },
      { pubkey: authority, isSigner: true, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    ],
    data: encodeArgs(name, earnRateBps, pointValueBig),
  });
}
