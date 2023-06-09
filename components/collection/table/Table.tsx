import { Suspense } from "react";
import { GridItem } from "@/components/grid-skeleton/GridSkeleton";
import { Text } from "@/components/text";
import { type Collection } from "@/lib/server/collection";

import { Row } from "../row";

interface IProps extends React.PropsWithChildren {
  collection: Collection[];
}

export default function Table({ collection }: IProps) {
  return (
    <>
      <div className="px-4 py-0 flex items-center justify-between font-light">
        <div className="w-80 mr-16"></div>
        <Text className="flex-1 mx-2" intent="h5">
          Title
        </Text>
        <Text className="w-1/6 mx-2" intent="h5">
          Artist
        </Text>
        <Text className="w-1/6 mx-2" intent="h5">
          Token id
        </Text>
        <div className="w-52"></div>
      </div>

      {collection.map((collection) => (
        <Suspense key={collection.id} fallback={<GridItem />}>
          {/* @ts-expect-error Server Component */}
          <Row {...collection} />
        </Suspense>
      ))}
    </>
  );
}
