"use client";

import { Text } from "@/components";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-screen h-screen mt-[-8vh] flex flex-col items-center justify-center text-purple">
      <Text intent="h1">Something went wrong :(</Text>
      <Text
        intent="h4"
        className="mt-6 cursor-pointer hover:underline"
        onClick={() => reset()}
      >
        Try again
      </Text>
    </div>
  );
}
