"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { type ConnectorData, useAccount } from "wagmi";

import { useUserStore } from "@/zustand/user";
import useRegisterOrLogin from "@/lib/client/useRegisterOrLogin";
import useLogout from "@/lib/client/useLogout";

import { Spinner } from "../ui";

export default function ConnectButton() {
  const router = useRouter();
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const {
    mutate: registerOrLogin,
    data,
    isLoading: isRegistringOrLoggingIn,
  } = useRegisterOrLogin({
    onSuccess: (data) => {
      setUser(data);

      if (pathname === "/") {
        router.refresh();
        router.push("/collection");
      }
    },
  });

  const { mutate: logout, isLoading: isLoggingOut } = useLogout({
    onSuccess: () => {
      router.refresh();
      router.push("/");
    },
  });

  const { connector } = useAccount({
    onConnect({ address, isReconnected }) {
      if (isReconnected && pathname !== "/" && user?.address === address) {
        return;
      }

      registerOrLogin(address as string);
    },
    onDisconnect() {
      logout();
    },
  });

  useEffect(() => {
    function onAccountChange({ account }: ConnectorData) {
      if (account) {
        registerOrLogin(account);
      }
    }

    if (connector) {
      connector.addListener("change", onAccountChange);
    }

    return () => {
      connector?.removeListener("change", onAccountChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector]);

  const isLoading = isRegistringOrLoggingIn || isLoggingOut;

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner color="red" size="small" />
      </div>
    );
  }

  return <RainbowConnectButton />;
}
