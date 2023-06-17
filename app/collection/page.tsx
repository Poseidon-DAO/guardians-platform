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
    <div className="w-full min-h-[92vh] flex flex-col justify-between">
      <div className="sticky top-[8vh] z-[1] bg-line dark:bg-background mt-3 pt-3 px-6 shadow-sm dark:shadow-darkBorder">
        <Header
          settings={settings}
          resultsCount={totalCount}
          viewed={viewedItems}
          searchParams={searchParams}
        />
      </div>

      <div className="flex-1">
        <Container
          collection={collection}
          layout={settings?.collectionLayout}
        />
      </div>

      {totalCount > 0 && (
        <div className="p-6">
          <Pagination page={page} totalCount={totalCount} pageSize={pageSize} />
        </div>
      )}
    </div>
  );
}
