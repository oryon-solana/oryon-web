import type { Brand, HistoryItem } from "../types";

export const HISTORY_INIT: HistoryItem[] = [];

export function getBrand(brands: Brand[], id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}
