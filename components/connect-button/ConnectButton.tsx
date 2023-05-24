"use client";

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from "wagmi";
import { AuthRedirect } from "../auth-redirect";

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

export default function ConnectButton() {
  useAccount({
    async onConnect({ address }) {
      const url = new URL("/user/register", baseUrl);

      await fetch(url.toString(), {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ address }),
      });
      // if (!res.ok) throw new Error(res.statusText);
    },
  });

  return (
    <>
      {/* <AuthRedirect /> */}
      <RainbowConnectButton />
    </>
  );
}
