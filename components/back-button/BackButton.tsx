"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "react-feather";
import { Text } from "../text";

export default function BackButton() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={handleClick}>
      <ChevronLeft size={26} />
      <Text intent="h6" className="ml-2">
        Back
      </Text>
    </div>
  );
}
