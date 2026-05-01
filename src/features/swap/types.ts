import type React from "react";

export type Brand = {
  id: string;
  name: string;
  unit: string;
  color: string;
  pointsMint: string;
  balance: number;
  logo: (s?: number) => React.ReactNode;
};

export type HistoryItem = {
  id: number;
  from: string;
  to: string;
  fromAmt: number;
  toAmt: number;
  date: string;
};

export type ModalStatus = "idle" | "loading" | "success";
