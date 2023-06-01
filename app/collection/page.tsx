import { Pagination } from "@/components";
import { Container, Header } from "@/components/collection";
import { getCollection } from "@/lib/server/collection";
import { getUserSettings } from "@/lib/server/user-settings";

import { type CustomNextPage } from "@/types";

export default async function Collection({
  searchParams,
}: CustomNextPage<{}, { page: string }>) {
  const page = Number(searchParams?.page) || 1;

  const settings = await getUserSettings();
  const { collection, pageSize, totalCount, pageCount } = await getCollection(
    searchParams
  );

  const viewedItems = (page - 1) * pageSize + pageCount;

  return (
    <div className="w-full px-6 flex flex-col justify-between">
      <Header
        settings={settings}
        resultsCount={totalCount}
        viewed={viewedItems}
      />

      <div className="flex-1 mb-4">
        <Container collection={collection} layout={settings.collectionLayout} />
      </div>

      <Pagination page={page} totalCount={totalCount} pageSize={pageSize} />
    </div>
  );
}
