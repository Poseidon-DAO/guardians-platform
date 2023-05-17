import { Collection } from "@/types";

import Item from "../item/Item";

interface IProps extends React.PropsWithChildren {
  collection: Collection[];
}

export default function Grid({ collection }: IProps) {
  if (!collection.length) {
    return <div>NO DATA</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {collection.map((collection) => (
        <Item key={collection.id} {...collection} />
      ))}
    </div>
  );
}
