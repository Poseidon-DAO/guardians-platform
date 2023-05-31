import Image from "next/image";
import Link from "next/link";
import { BarChart2 } from "react-feather";
import { Tooltip } from "@/components/tooltip";
import { type Collection } from "@/lib/server/collection";

import { Card } from "../../card";
import { VoteControls } from "../../vote-controls";
import { Text } from "../../text";

interface IProps extends React.PropsWithChildren, Collection {}

export default async function ItemCard({
  id,
  image,
  description,
  title,
  createdBy,
  votes,
}: IProps) {
  return (
    <Link href={`/collection/${id}`}>
      <Card key={id} className="aspect-square relative overflow-hidden">
        <Image
          src={image}
          alt={description}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center rounded-lg transition transform duration-500 hover:scale-110"
        />
        <div className="flex flex-col-reverse text-white p-4 absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none">
          <div className="pointer-events-auto">
            <Text size="small" className="line-clamp-1">
              {createdBy}
            </Text>
            <Text intent="h4" className="line-clamp-1" title={title}>
              {title}
            </Text>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <div className="my-4">
          <VoteControls collectionId={id} />
        </div>

        <Tooltip title="Votes" position="top">
          <div className="flex items-center">
            <span className="font-bold">{votes.length}</span>
            <BarChart2 size={16} />
          </div>
        </Tooltip>
      </div>
    </Link>
  );
}
