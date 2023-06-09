"use client";

import { usePathname, useRouter } from "next/navigation";
import { Text } from "@/components/ui/text";
import useRevalidate from "@/lib/client/useRevalidate";

export default function ClearFilters() {
  const { mutate: revalidate } = useRevalidate();
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    revalidate("collection");
    router.push(pathname);
  }

  return (
    <div>
      <Text
        onClick={handleClick}
        className="cursor-pointer text-sm dark:text-red text-blue font-medium underline"
      >
        Clear filters
      </Text>
    </div>
  );
}
