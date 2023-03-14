"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  lightTheme,
  getDefaultWallets,
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

const theme: Theme = {
  ...lightTheme({
    accentColor: "#f20a70",
    accentColorForeground: "white",
    fontStack: "system",
    borderRadius: "medium",
  }),
  fonts: {
    body: "ubuntu-mono,Ubuntu,sans-serif",
  },
};

interface IProps extends React.PropsWithChildren {}

export function Providers({ children }: IProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={theme} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
