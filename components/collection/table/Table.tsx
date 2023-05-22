import { Card } from "@/components/card";
import { type Collection } from "@/types";
import clsx from "clsx";

import { Row } from "../row";

interface IProps extends React.PropsWithChildren {
  collection: Collection[];
}

export default function Table({ collection }: IProps) {
  return (
    <Card>
      {collection.map((collection) => (
        <Row key={collection.id} {...collection} />
      ))}
    </Card>
  );
}
