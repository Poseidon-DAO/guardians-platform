import { BackButton } from "@/components";
import { Item } from "@/components/collection/item";
import { type Collection, getCollection } from "@/lib/server/collection";
import { type CustomNextPage } from "@/types";

export default async function CollectionItem({
  params,
}: CustomNextPage<{ id: string }>) {
  const { collection } = await getCollection();

  const collectionItem = collection.find(
    (item) => item.id === params?.id
  ) as Collection;

  return (
    <div className="flex flex-col p-6 justify-between box-border h-[92vh]">
      <BackButton />

      <div className="flex-1 max-h-[82vh]">
        <Item item={collectionItem} />
      </div>
    </div>
  );
}
