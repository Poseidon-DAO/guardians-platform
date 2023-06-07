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

  const {
    mutate: registerOrLogin,
    data,
    isSuccess: isRegisterOrLoginSuccess,
    isLoading: isRegistringOrLoggingIn,
  } = useRegisterOrLogin();

  const {
    mutate: logout,
    isSuccess: isLogoutSuccess,
    isLoading: isLoggingOut,
  } = useLogout();

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

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (data?.id) {
      setUser(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id]);

  useEffect(() => {
    if (isRegisterOrLoginSuccess && pathname === "/") {
      router.push("/collection");
    }

    if (isLogoutSuccess) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterOrLoginSuccess, isLogoutSuccess]);

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
