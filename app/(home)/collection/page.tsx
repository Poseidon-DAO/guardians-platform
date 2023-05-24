import { Container, Header } from "@/components/collection";
import { UserSettings, type Collection, type CustomNextPage } from "@/types";
import { Suspense } from "react";

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

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
  const collection = (await res.json()).collection as Collection[];

  return collection;
}

async function getUserSettings(userId: string) {
  const url = new URL("/user/settings", baseUrl);

  url.searchParams.append("userId", userId);

  const res = await fetch(url.toString(), { cache: "no-cache" });
  if (!res.ok) throw new Error(res.statusText);
  const settings = (await res.json()) as UserSettings;

  return settings;
}

export default async function Collection({ searchParams }: CustomNextPage) {
  const collection = await getCollection(searchParams);
  const settings = await getUserSettings(
    "243547bd-61e5-4ebb-bcae-fbdb16ae3d4c"
  );

  return (
    <div className="w-full min-h-screen p-8">
      <Header settings={settings} />
      <Container collection={collection} layout={settings.collectionLayout} />
    </div>
  );
}
