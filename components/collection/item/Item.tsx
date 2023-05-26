import Image from "next/image";
import { Collection } from "@/types";
import { BarChart2 } from "react-feather";

import { Card } from "../../card";
import { VoteControls } from "../../vote-controls";
import { Text } from "../../text";
import { Tooltip } from "@/components/tooltip";

interface IProps extends React.PropsWithChildren, Collection {}

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

async function getCollectionVotes(collectionId: string) {
  const url = new URL(`/collection/${collectionId}/votes`, baseUrl);
  const res = await fetch(url.toString());

  if (!res.ok) throw new Error(res.statusText);
  const votes = (await res.json()) as { count: number };

  return votes;
}

export default async function Item({
  id,
  image,
  description,
  title,
  createdBy,
}: IProps) {
  const { count } = await getCollectionVotes(id);

  return (
    <div>
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
        <VoteControls collectionId={id} />

        <Tooltip title="Votes" position="top">
          <div className="flex items-center">
            <span className="font-bold">{count}</span>
            <BarChart2 size={16} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
