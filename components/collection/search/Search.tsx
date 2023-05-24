"use client";

import { type ChangeEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui";
import { createQueryString } from "@/utils/utils/url";

export const QUERY_KEY = "query";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

export default function Search(props: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQueryValue = searchParams.get(QUERY_KEY) || "";
  const [query, setQuery] = useState(initialQueryValue);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const searchValue = event?.target.value;
    setQuery(searchValue);
    const url =
      pathname +
      "?" +
      createQueryString(searchParams, { name: QUERY_KEY, value: searchValue });
    router.push(!searchValue ? pathname : url);
  }

  return (
    <div className="h-full">
      <Input
        className="w-full h-full"
        placeholder="Search for Collection"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
