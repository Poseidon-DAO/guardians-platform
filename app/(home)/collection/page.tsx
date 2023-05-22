import { Container, Header } from "@/components/collection";
import { type Collection, type CustomNextPage } from "@/types";

const baseUrl = process.env.PDN_API_BASE_URL!;

async function getCollection(searchParams: CustomNextPage["searchParams"]) {
  const url = new URL("/collection", baseUrl);

  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key];

    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, v));
    } else if (value !== undefined) {
      url.searchParams.append(key, value);
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(res.statusText);
  const collection = (await res.json()) as Collection[];
  return collection;
}

export default async function Collection({ searchParams }: CustomNextPage) {
  const collection = await getCollection(searchParams);

  return (
    <div className="w-full min-h-screen p-8">
      <Header />
      <Container collection={collection} />
    </div>
  );
}
