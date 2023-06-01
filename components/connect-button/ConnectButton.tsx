"use client";

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import useRegisterOrLogin from "@/lib/client/useRegisterOrLogin";
import { useUserStore } from "@/zustand/user";
import { useEffect } from "react";

export default function ConnectButton() {
  const { mutate, data } = useRegisterOrLogin();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (data?.id) {
      setUser(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id]);

  useAccount({
    onConnect({ address }) {
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
