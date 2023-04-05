import { Collection } from "@/types";

import { CollectionItem } from "../collection-item";

interface IProps extends React.PropsWithChildren {
  collection: Collection[];
}

export function CollectionGrid({ collection }: IProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {collection.map((collection) => (
        <CollectionItem key={collection.id} {...collection} />
      ))}
    </div>
  );
}
