import { Suspense } from "react";
import { Card } from "@/components/card";
import { GridItem } from "@/components/grid-skeleton/GridSkeleton";
import { type Collection } from "@/lib/server/collection";

import { Row } from "../row";

interface IProps extends React.PropsWithChildren {
  collection: Collection[];
}

export default function Table({ collection }: IProps) {
  return (
    <>
      {collection.map((collection) => (
        <Suspense key={collection.id} fallback={<GridItem />}>
          {/* @ts-expect-error Server Component */}
          <Row {...collection} />
        </Suspense>
      ))}
    </>
  );
}
