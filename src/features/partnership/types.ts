export interface PartnershipFormData {
  name: string;
  earnRate: string;
  pointValueIDR: string;
}

export type PartnershipFormErrors = Partial<Record<keyof PartnershipFormData, string>>;
export type PartnershipFocusState = Partial<Record<keyof PartnershipFormData, boolean>>;
export type PartnershipFormStatus = "idle" | "loading" | "success";
