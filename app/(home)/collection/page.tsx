import { CollectionGrid } from "@/components";
import { type Collection } from "@/types";

const baseUrl = process.env.PDN_API_BASE_URL!;

async function getCollection(collectionName?: "SuperRare") {
  const res = await fetch(
    `${baseUrl}/nft/collection?platform=${collectionName}`
  );
  if (!res.ok) throw new Error(res.statusText);
  const collection = (await res.json()) as Collection[];
  return collection;
}

export default async function Collection() {
  const collection = await getCollection("SuperRare");

  return (
    <div className="w-full min-h-screen p-8">
      <CollectionGrid collection={collection} />
    </div>
  );
}
