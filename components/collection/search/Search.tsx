"use client";

import { type ChangeEvent, useState, FormEvent, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { Input } from "@/components/ui";
import { Text } from "@/components/text";
import { createQueryString } from "@/utils/utils/url";
import { useClickOutside } from "@/hooks/core";
import useDebounce from "@/hooks/core/useDebounce";
import useSearchCollectionSuggestions from "@/lib/client/useSearchCollectionSuggestions";

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
  const debouncedQuery = useDebounce(query, 500);

  const [popoverOpen, setPopoverOpen] = useState(!!debouncedQuery);

  const containerRef = useClickOutside(() => setPopoverOpen(false));

  const { mutate, data, isSuccess, isLoading } =
    useSearchCollectionSuggestions();
  const suggestions = data?.results;

  useEffect(() => {
    if (debouncedQuery) {
      mutate(debouncedQuery);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    setPopoverOpen(!!debouncedQuery);
  }, [debouncedQuery]);

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event?.target.value);
  }

  function closePopover() {
    setPopoverOpen(false);
  }

  function handleFocus() {
    setPopoverOpen(!!debouncedQuery);
  }

  function handleSuggestionClick(id: string) {
    closePopover();
    router.push(`/collection/${id}`);
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
    <div className="h-full w-full relative" ref={containerRef}>
      <form className="w-full h-full " onSubmit={handleSubmit}>
        <Input
          className="w-full h-full"
          placeholder="Search for Collection"
          value={query}
          onChange={handleChange}
          onClear={closePopover}
          onFocus={handleFocus}
          isLoading={isLoading}
        />
      </form>

      {popoverOpen && (
        <div className="absolute top-full left-0 w-full z-20 overflow-hidden bg-white dark:bg-darkPopover rounded-lg shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] mt-2 p-[5px]">
          {!!suggestions?.length && (
            <Text className="px-[10px] py-2 text-right" size="small">
              {suggestions.length} results found for{" "}
              <span className="font-medium">&quot;{query}&quot;</span>
            </Text>
          )}

          {!!suggestions?.length &&
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-center justify-between leading-none rounded-lg py-3 px-[15px] cursor-pointer hover:bg-blue hover:text-white dark:hover:bg-darkBorder"
                onClick={() => handleSuggestionClick(suggestion.id)}
              >
                <Text>{suggestion.title}</Text>
                <div className="relative aspect-auto w-9 h-9">
                  <Image
                    src={suggestion.image}
                    alt={suggestion.title}
                    fill
                    priority
                    sizes="36px"
                    className="object-cover object-center rounded-lg transition transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            ))}

          {suggestions?.length === 0 && isSuccess && !isLoading && (
            <Text size="small" className="py-2">
              No suggestions found for &quot;{query}&quot;
            </Text>
          )}
        </div>
      )}
    </div>
  );
}
