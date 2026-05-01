"use client";

import type { ReactNode } from "react";
import { PhantomProvider, darkTheme } from "@phantom/react-sdk";
import { AddressType } from "@phantom/browser-sdk";
import { ThemeProvider } from "@/providers/theme-provider";

type Props = {
  children: ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <ThemeProvider>
      <PhantomProvider
        config={{
          providers: ["injected"],
          addressTypes: [AddressType.solana],
        }}
        theme={darkTheme}
        appName="Oryon"
        appIcon="/logo-color.svg"
      >
        {children}
      </PhantomProvider>
    </ThemeProvider>
  );
}
