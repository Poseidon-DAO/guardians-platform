"use client";

import { useEffect } from "react";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import useRegisterOrLogin from "@/lib/client/useRegisterOrLogin";
import useLogout from "@/lib/client/useLogout";
import { useUserStore } from "@/zustand/user";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui";

export default function ConnectButton() {
  const router = useRouter();

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

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (data?.id) {
      setUser(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id]);

  useEffect(() => {
    if (isRegisterOrLoginSuccess) {
      console.log("hini");
      router.push("/collection");
    }

    if (isLogoutSuccess) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterOrLoginSuccess, isLogoutSuccess]);

  useAccount({
    onConnect({ address }) {
      registerOrLogin(address as string);
    },
    onDisconnect() {
      logout();
    },
  });

  const isLoading = isRegistringOrLoggingIn || isLoggingOut;

  if (isLoading) {
    return (
      <div className="w-40 flex justify-center">
        <Spinner color="red" />
      </div>
    );
  }

  return <RainbowConnectButton />;
}
