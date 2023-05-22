"use client";

import { type Collection } from "@/types";
import { useUiStore } from "@/zustand/ui";

import Grid from "../grid/Grid";
import { Table } from "../table";

interface IProps extends React.PropsWithChildren {
  collection: Collection[];
}

export default function Container({ collection, children }: IProps) {
  const collectionLayout = useUiStore((state) => state.collectionLayout);

  if (!collection.length) {
    return <div>NO DATA</div>;
  }

  if (collectionLayout === "table") {
    return <Table collection={collection} />;
  }

  return <Grid collection={collection} layout={collectionLayout} />;
}
