"use client";

import { type ReactNode } from "react";

import { NextUIProvider } from "@nextui-org/system";
import WalletProvider from "./contexts/WalletProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </WalletProvider>
  );
}
