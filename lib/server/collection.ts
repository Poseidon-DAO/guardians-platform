import { type CustomNextPage } from "@/types";
import { cookies } from "next/headers";

export type Collection = {
  id: string;
  platform: string;
  platformAddress: string;
  tokenId: string;
  tokenType: string;
  title: string;
  balance: string;
  description: string;
  tokenUriRaw: string;
  tokenUriGateway: string;
  image: string;
  createdBy: string;
  yearCreated: string;
  mimeType: string;
  mimeUri: string;
  tags: string[];
  timeLastUpdated: Date;
  votes: {
    vote: "DOWNVOTE" | "UPVOTE";
    userId: string;
    collectionId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

export async function getCollectionItem(collectionId: string) {
  const url = new URL(`/collection/${collectionId}`, baseUrl);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(res.statusText);
  const collectionItem = (await res.json()) as Collection;

  return collectionItem;
}

export async function getCollection(
  searchParams?: CustomNextPage["searchParams"]
) {
  const url = new URL("/collection", baseUrl);

  if (searchParams) {
    Object.keys(searchParams).forEach((key) => {
      const value = searchParams[key];

      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, v));
      } else if (value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
  }

  const userId = cookies().get("userId")?.value;
  url.searchParams.append("userId", userId as string);

  const res = await fetch(url.toString(), { cache: "force-cache" });

  if (!res.ok) throw new Error(res.statusText);
  const collection = (await res.json()) as {
    collection: Collection[];
    pageCount: number;
    pageSize: number;
    totalCount: number;
  };

  return collection;
}
