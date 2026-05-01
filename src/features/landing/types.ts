import type { LucideIcon } from "lucide-react";

export type Stat = {
  v: string;
  l: string;
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type Step = {
  num: string;
  title: string;
  desc: string;
};

export type Partner = string;
