import { Pagination } from "@/components";
import { Container, Header } from "@/components/collection";
import type { UserSettings, Collection, CustomNextPage } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

let userId = "243547bd-61e5-4ebb-bcae-fbdb16ae3d4c";

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

  url.searchParams.append("userId", userId);

  await new Promise((resolve) => {
    setTimeout(() => resolve("sdad"), 4000);
  });

  const res = await fetch(url.toString());

  if (!res.ok) throw new Error(res.statusText);
  const collection = (await res.json()) as {
    collection: Collection[];
    pageCount: number;
    pageSize: number;
    totalCount: number;
  };

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
  const { collection, pageSize, totalCount } = await getCollection(
    searchParams
  );
  const settings = await getUserSettings(userId);

  return (
    <div className="w-full min-h-[92vh] px-8 py-6 flex flex-col justify-between">
      <Header settings={settings} resultsCount={totalCount} showN={pageSize} />

      <div className="flex-1">
        <Container collection={collection} layout={settings.collectionLayout} />
      </div>

      <Pagination
        page={Number(searchParams["page"]) || 1}
        totalCount={totalCount}
        pageSize={pageSize}
      />
    </div>
  );
}
