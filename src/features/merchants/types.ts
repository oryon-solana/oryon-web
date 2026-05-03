export interface Merchant {
  pubkey: string;
  name: string;
  earnRate: number;        // already in display units (bps / 100), e.g. 1.5
  pointValueIDR: number;
  active: boolean;
  totalPointsIssued: bigint;
  totalPointsRedeemed: bigint;
  merchantId: number;
}
