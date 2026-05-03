export interface MerchantState {
  pubkey: string;
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
}

export interface PartnershipFormData {
  name: string;
  earnRate: string;
  pointValueIDR: string;
}

export type PartnershipFormErrors = Partial<Record<keyof PartnershipFormData, string>>;
export type PartnershipFocusState = Partial<Record<keyof PartnershipFormData, boolean>>;
export type PartnershipFormStatus = "idle" | "loading" | "success";
