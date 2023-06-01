import { Suspense } from "react";
import clsx from "clsx";

import { type Collection } from "@/lib/server/collection";
import { GridItem } from "@/components/grid-skeleton/GridSkeleton";

import ItemCard from "../item-card/Item-card";
import { type LayoutTypes } from "../view-toggle/ViewToggle";

interface IProps extends React.PropsWithChildren {
  collection: Collection[];
  layout?: Exclude<LayoutTypes, "table">;
}

export default function Grid({ collection, layout = "grid" }: IProps) {
  return (
    <div
      className={clsx(
        "grid gap-6",
        layout === "grid" ? "grid-cols-3" : "grid-cols-5"
      )}
    >
      {collection.map((collection) => (
        <Suspense key={collection.id} fallback={<GridItem />}>
          {/* @ts-expect-error Server Component */}
          <ItemCard {...collection} />
        </Suspense>
      ))}
    </div>
  );
}
