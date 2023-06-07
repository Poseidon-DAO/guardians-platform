"use client";

import { usePathname, useRouter } from "next/navigation";
import { Text } from "@/components/text";

export default function ClearFilters() {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    router.push(pathname);
  }

  return (
    <div>
      <Text
        onClick={handleClick}
        className="cursor-pointer text-sm !text-blue font-medium underline"
      >
        Clear filters
      </Text>
    </div>
  );
}
