"use client";

import { Text } from "@/components/ui";
import { useScroll } from "@/hooks/core";

export default function TableHeader() {
  const scrollPosition = useScroll();

  return (
    <div
      className={`sticky w-screen top-[calc(8vh+108px)] z-50 py-2 my-2 px-10 flex items-center justify-between font-light ${
        scrollPosition > 20
          ? "bg-line dark:bg-darkBorder dark:text-white shadow-sm"
          : ""
      }`}
    >
      <Text className="w-80 mr-16" intent="h5">
        Image
      </Text>
      <Text className="flex-1 mx-2" intent="h5">
        Title
      </Text>
      <Text className="w-1/6 mx-2" intent="h5">
        Artist
      </Text>
      <Text className="w-1/6 mx-2" intent="h5">
        Token id
      </Text>
      <div className="w-52"></div>
    </div>
  );
}
