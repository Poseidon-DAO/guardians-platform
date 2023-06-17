"use client";

import "@rainbow-me/rainbowkit/styles.css";

import merge from "lodash.merge";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
  Theme,
} from "@rainbow-me/rainbowkit";
import {
  WagmiConfig,
  createClient,
  configureChains,
  mainnet,
  goerli,
} from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { type ThemeTypes } from "@/components/switch-theme/SwitchTheme";

interface IProps extends React.PropsWithChildren {
  theme?: ThemeTypes;
}

const chainFromEnv = process.env.NEXT_PUBLIC_CHAIN_ID as "0x1" | "0x5";
const chainToUse = {
  "0x5": goerli,
  "0x1": mainnet,
}[chainFromEnv];

const { chains, provider } = configureChains(
  [chainToUse || mainnet],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! })]
);

const { connectors } = getDefaultWallets({
  appName: "Guardians Platform",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient();

export function Providers({ children, theme }: IProps) {
  const myTheme =
    theme === "dark"
      ? merge(darkTheme(), {
          colors: { modalBackground: "#1e293b" },
          radii: { modal: "0.5rem" },
        } as Theme)
      : merge(lightTheme(), {
          radii: { modal: "0.5rem" },
        });

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          appInfo={{ appName: "PDN Guardians" }}
          chains={chains}
          modalSize="compact"
          theme={myTheme}
        >
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
