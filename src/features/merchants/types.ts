import type { ReactNode } from "react";

export interface Merchant {
  id: string;
  name: string;
  cat: string;
  earnRate: number;
  pointValueIDR: number;
  unit: string;
  active: boolean;
  logo: (size?: number) => ReactNode;
}
