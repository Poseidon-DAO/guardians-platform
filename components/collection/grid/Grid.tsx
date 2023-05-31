import clsx from "clsx";
import { Suspense } from "react";

import { type Collection } from "@/lib/server/collection";

import ItemCard from "../item-card/Item-card";

interface IProps extends React.PropsWithChildren {
  collection: Collection[];
  layout?: "column" | "grid";
}

export default function Grid({ collection, layout = "grid" }: IProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-${cols} gap-6",
        layout === "grid" ? "grid-cols-3" : "grid-cols-2"
      )}
    >
      {collection.map((collection) => (
        <Suspense key={collection.id} fallback={<div>loading item</div>}>
          {/* @ts-expect-error Server Component */}
          <ItemCard {...collection} />
        </Suspense>
      ))}
    </div>
  );
}
