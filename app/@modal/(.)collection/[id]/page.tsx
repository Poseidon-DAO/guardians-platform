import { ItemModal } from "@/components/collection";
import { Item } from "@/components/collection/item";
import { type Collection, getCollection } from "@/lib/server/collection";

import { type CustomNextPage } from "@/types";

export default async function CollectionItemModal({
  params,
}: CustomNextPage<{ id: string }>) {
  const { collection } = await getCollection();

  const collectionItem = collection.find(
    (item) => item.id === params?.id
  ) as Collection;

  return (
    <ItemModal>
      <Item item={collectionItem} type="modal" />
    </ItemModal>
  );
}
