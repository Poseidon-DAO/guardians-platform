import { useMutation } from "@tanstack/react-query";

import { type Collection } from "../server";

type Suggestion = Pick<Collection, "id" | "image" | "title">;
type SearchResponse = {
  results: Suggestion[];
  count: number;
};

const key: string = "/search";
const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;
const url = new URL(key, baseUrl);

async function getSuggestions(query: string): Promise<SearchResponse> {
  url.searchParams.append("query", query);

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });
  return await res.json();
}

export default function useSearchCollectionSuggestions() {
  return useMutation({
    mutationFn: (query: string) => getSuggestions(query),
    mutationKey: [key],
  });
}
