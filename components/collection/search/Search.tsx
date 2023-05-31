"use client";

import { type ChangeEvent, useState, FormEvent, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui";
import { createQueryString } from "@/utils/utils/url";
import { type Collection } from "@/types";
import { Text } from "@/components/text";
import Image from "next/image";
import useDebounce from "@/hooks/core/useDebounce";

export const QUERY_KEY = "query";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

type Suggestion = Pick<Collection, "id" | "image" | "title">;

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

async function getSearchSuggestions(query: string) {
  const url = new URL("/search", baseUrl);

  url.searchParams.append("query", query);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) throw new Error(res.statusText);
  const collection = (await res.json()) as {
    results: Suggestion[];
    count: number;
  };

  return collection;
}

export default function Search(props: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQueryValue = searchParams.get(QUERY_KEY) || "";
  const [query, setQuery] = useState(initialQueryValue);
  const debouncedQuery = useDebounce(query, 500);
  const [popoverOpen, setPopoverOpen] = useState(!!query);
  const [isLoading, setIsLoading] = useState(false);

  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      (async () => {
        const { results } = await getSearchSuggestions(debouncedQuery);
        setSuggestions(results.length ? results : null);
        setIsLoading(false);
      })();
    }
  }, [debouncedQuery]);

  console.log({ isLoading });

  useEffect(() => {
    setPopoverOpen(!!query);
  }, [query]);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event?.target.value);
  }

  function handleFocus() {
    setPopoverOpen(!!query);
  }

  function handleBlur() {
    setPopoverOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url =
      pathname +
      "?" +
      createQueryString(searchParams, { name: QUERY_KEY, value: query });
    router.push(!query ? pathname : url);
    setQuery("");
  }

  return (
    <div className="h-full w-full relative">
      <form className="w-full h-full " onSubmit={handleSubmit}>
        <Input
          className="w-full h-full px-[15px]"
          placeholder="Search for Collection"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </form>

      {popoverOpen && (
        <div className="absolute top-full left-0 w-full z-20 overflow-hidden bg-white rounded-lg shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] mt-2 p-[5px]">
          {!!suggestions &&
            !!suggestions.length &&
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-center justify-between leading-none rounded-lg py-3 px-[15px] cursor-pointer hover:bg-blue hover:text-white"
              >
                <Text>{suggestion.title}</Text>
                <div className="relative aspect-auto w-9 h-9">
                  <Image
                    src={suggestion.image}
                    alt={suggestion.title}
                    fill
                    className="object-cover object-center rounded-lg transition transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            ))}

          {!suggestions && !isLoading && (
            <Text textColor="purple" size="small" className="py-2">
              No suggestions found for &quot;{query}&quot;
            </Text>
          )}
        </div>
      )}
    </div>
  );
}
