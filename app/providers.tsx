"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  WagmiConfig,
  createClient,
  configureChains,
  mainnet,
  goerli,
} from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { alchemyProvider } from "wagmi/providers/alchemy";

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

interface IProps extends React.PropsWithChildren {}

export function Providers({ children }: IProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          appInfo={{ appName: "PDN Guardians" }}
          chains={chains}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
