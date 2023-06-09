"use client";

import { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { type ConnectorData, useAccount } from "wagmi";

import { useUserStore } from "@/zustand/user";
import useRegisterOrLogin from "@/lib/client/useRegisterOrLogin";
import useLogout from "@/lib/client/useLogout";

import { Spinner, Button } from "../ui";
import { ProfilePopover } from "../profile-popover";
import { type ThemeTypes } from "../switch-theme/SwitchTheme";

interface IProps {
  theme?: ThemeTypes;
  hasUserSession?: boolean;
}

export default function ConnectButton({ theme, hasUserSession }: IProps) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const { mutate: registerOrLogin, isLoading: isRegistringOrLoggingIn } =
    useRegisterOrLogin({
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

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              className: "h-full opacity-0 pointer-events-none select-none",
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button size="small" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button size="small" onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex gap-3 h-full">
                  <Button
                    size="small"
                    onClick={openChainModal}
                    className="flex items-center"
                    type="button"
                    colorScheme={theme === "light" ? "white" : "indigo"}
                  >
                    {chain.hasIcon && (
                      <div
                        className={`w-3 h-3 rounded-full hidden mr-1`}
                        style={{ background: chain.iconBackground }}
                      >
                        {chain.iconUrl && (
                          <Image
                            src={chain.iconUrl}
                            width="12"
                            height="12"
                            alt={chain.name ?? "Chain icon"}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button
                    size="small"
                    onClick={openAccountModal}
                    type="button"
                    colorScheme={theme === "light" ? "white" : "indigo"}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </Button>

                  {connected && hasUserSession && (
                    <ProfilePopover theme={theme} />
                  )}
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
