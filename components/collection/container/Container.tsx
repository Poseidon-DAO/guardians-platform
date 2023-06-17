import { type Collection } from "@/lib/server/collection";

import { Grid } from "../grid";
import { Table } from "../table";
import { EmptyScreen } from "../empty-screen";

import { type LayoutTypes } from "../view-toggle/ViewToggle";

interface IProps extends React.PropsWithChildren {
  collection: Collection[];
  layout: LayoutTypes;
}

export default function Container({ collection, layout }: IProps) {
  if (!collection.length) {
    return <EmptyScreen />;
  }

  if (layout === "table") {
    return <Table collection={collection} />;
  }

  return <Grid collection={collection} layout={layout} />;
}
