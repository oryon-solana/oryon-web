import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import type { Brand } from "../types";

const PROGRAM_ID = new PublicKey(
  "EsmVw26H7pZwxcRAULpUj3mqR3V6WDScuYvp4SApG5nr",
);

type MerchantState = {
  platform: string;
  authority: string;
  name: string;
  pointsMint: string;
  earnRate: bigint;
  pointValueIdr: bigint;
  isActive: boolean;
  totalPointsIssued: bigint;
  totalPointsRedeemed: bigint;
  merchantId: number;
  bump: number;
  mintBump: number;
};

type ReadResult<T> = {
  value: T;
  offset: number;
};

const textDecoder = new TextDecoder();

function readPubkey(data: Buffer, offset: number): ReadResult<string> {
  const key = new PublicKey(data.subarray(offset, offset + 32)).toBase58();
  return { value: key, offset: offset + 32 };
}

function readU32(data: Buffer, offset: number): ReadResult<number> {
  return { value: data.readUInt32LE(offset), offset: offset + 4 };
}

function readU64(data: Buffer, offset: number): ReadResult<bigint> {
  return { value: data.readBigUInt64LE(offset), offset: offset + 8 };
}

function readBool(data: Buffer, offset: number): ReadResult<boolean> {
  return { value: data[offset] === 1, offset: offset + 1 };
}

function readString(data: Buffer, offset: number): ReadResult<string> {
  const { value: len, offset: nextOffset } = readU32(data, offset);
  const end = nextOffset + len;
  const value = textDecoder.decode(data.subarray(nextOffset, end));
  return { value, offset: end };
}

function decodeMerchantState(data: Buffer): MerchantState | null {
  if (data.length < 8 + 32 + 32 + 4 + 32) return null;
  let offset = 8; // Skip Anchor discriminator.

  const platformRes = readPubkey(data, offset);
  offset = platformRes.offset;
  const authorityRes = readPubkey(data, offset);
  offset = authorityRes.offset;
  const nameRes = readString(data, offset);
  offset = nameRes.offset;
  const pointsMintRes = readPubkey(data, offset);
  offset = pointsMintRes.offset;
  const earnRateRes = readU64(data, offset);
  offset = earnRateRes.offset;
  const pointValueRes = readU64(data, offset);
  offset = pointValueRes.offset;
  const activeRes = readBool(data, offset);
  offset = activeRes.offset;
  const issuedRes = readU64(data, offset);
  offset = issuedRes.offset;
  const redeemedRes = readU64(data, offset);
  offset = redeemedRes.offset;
  const merchantIdRes = readU32(data, offset);
  offset = merchantIdRes.offset;
  const bump = data[offset] ?? 0;
  const mintBump = data[offset + 1] ?? 0;

  return {
    platform: platformRes.value,
    authority: authorityRes.value,
    name: nameRes.value,
    pointsMint: pointsMintRes.value,
    earnRate: earnRateRes.value,
    pointValueIdr: pointValueRes.value,
    isActive: activeRes.value,
    totalPointsIssued: issuedRes.value,
    totalPointsRedeemed: redeemedRes.value,
    merchantId: merchantIdRes.value,
    bump,
    mintBump,
  };
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function hashToHue(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 360;
  }
  return hash;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return `${first}${second}`.toUpperCase() || "M";
}

function safeNumber(value: bigint) {
  const asNumber = Number(value);
  if (!Number.isFinite(asNumber)) return Number.MAX_SAFE_INTEGER;
  return Math.min(asNumber, Number.MAX_SAFE_INTEGER);
}

function createBrandLogo(name: string, color: string) {
  return (size = 32) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill={color} />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        {initials(name)}
      </text>
    </svg>
  );
}

export async function fetchMerchants(): Promise<Brand[]> {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const accounts = await connection.getProgramAccounts(PROGRAM_ID);

  return accounts
    .map((account) => decodeMerchantState(account.account.data))
    .filter((merchant): merchant is MerchantState => !!merchant)
    .filter((merchant) => merchant.isActive)
    .map((merchant) => {
      const id = `${slugify(merchant.name)}-${merchant.merchantId}`;
      const hue = hashToHue(merchant.pointsMint);
      const color = `hsl(${hue} 70% 55%)`;
      const balance = safeNumber(
        merchant.totalPointsIssued - merchant.totalPointsRedeemed,
      );

      return {
        id,
        name: merchant.name,
        unit: "Points",
        color,
        pointsMint: merchant.pointsMint,
        balance,
        logo: createBrandLogo(merchant.name, color),
      } satisfies Brand;
    });
}
