import { Pagination } from "@/components";
import { Container, Header } from "@/components/collection";
import { getCollection } from "@/lib/server/collection";
import { getUserSettings } from "@/lib/server/user-settings";

import { type CustomNextPage } from "@/types";

let userId = "243547bd-61e5-4ebb-bcae-fbdb16ae3d4c";

export default async function Collection({
  searchParams,
}: CustomNextPage<{}, { page: string }>) {
  const page = Number(searchParams?.page) || 1;

  const settings = await getUserSettings(userId);
  const { collection, pageSize, totalCount, pageCount } = await getCollection(
    searchParams
  );

  const viewedItems = (page - 1) * pageSize + pageCount;

  return (
    <div className="w-full px-8 flex flex-col justify-between">
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
