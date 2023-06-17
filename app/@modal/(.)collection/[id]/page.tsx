import { ItemModal } from "@/components/collection";
import { Item } from "@/components/collection/item";
import { getUserSettings } from "@/lib/server";
import {
  type Collection,
  getCollection,
  getCollectionItem,
} from "@/lib/server/collection";

import { type CustomNextPage } from "@/types";

export default async function CollectionItemModal({
  params,
}: CustomNextPage<{ id: string }>) {
  const { collection } = await getCollection();
  const settings = await getUserSettings();

  const collectionItemOnCache = collection.find(
    (item) => item?.id === params?.id
  ) as Collection;

  const collectionItem =
    collectionItemOnCache || (await getCollectionItem(params?.id as string));

  return (
    <ItemModal>
      <Item item={collectionItem} settings={settings} type="modal" />
    </ItemModal>
  );
}
