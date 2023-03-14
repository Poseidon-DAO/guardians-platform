"use client";

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { AuthRedirect } from "../auth-redirect";

export function ConnectButton() {
  return (
    <>
      <AuthRedirect />
      <RainbowConnectButton />
    </>
  );
}
