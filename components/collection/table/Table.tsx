import { Card } from "@/components/card";
import { type Collection } from "@/lib/server/collection";

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
