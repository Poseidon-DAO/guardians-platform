"use client";

import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export const useBrowserLayoutEffect = process.browser
  ? useLayoutEffect
  : () => {};

export function AuthRedirect() {
  const { isConnected } = useAccount();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isConnected) {
      return replace("/");
    }

    if (isConnected) {
      return replace("/collection");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return null;
}
