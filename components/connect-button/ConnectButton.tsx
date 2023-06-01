"use client";

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import useRegisterOrLogin from "@/lib/client/useRegisterOrLogin";

export default function ConnectButton() {
  const { mutate } = useRegisterOrLogin();
  useAccount({
    async onConnect({ address }) {
      mutate(address as string);
    },
  });

  return (
    <>
      {/* <AuthRedirect /> */}
      <RainbowConnectButton />
    </>
  );
}
