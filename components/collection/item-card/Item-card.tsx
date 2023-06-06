import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { BarChart2 } from "react-feather";
import { Tooltip } from "@/components/ui/tooltip";
import { getUserSettings } from "@/lib/server";

import { type Collection } from "@/lib/server/collection";

import { Card } from "../../card";
import { VoteControls } from "../../vote-controls";
import { Text } from "../../text";

interface IProps extends React.PropsWithChildren, Collection {
  gridsLength?: number;
}

export default async function ItemCard({
  id,
  image,
  description,
  title,
  createdBy,
  votes,
  gridsLength,
}: IProps) {
  const settings = await getUserSettings();

  const currentVote = votes.find(
    (vote) => vote.userId === cookies().get("userId")?.value
  );

  return (
    <div>
      <Link href={`/collection/${id}`}>
        <Card key={id} className="aspect-square relative overflow-hidden">
          <Image
            src={image}
            alt={description}
            fill
            className="object-cover object-center rounded-lg transition transform duration-500 hover:scale-110"
            sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${
              gridsLength === 3 ? "33vw" : "20vw"
            }`}
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
      </Link>

      <div className="flex items-center justify-between">
        <div className="my-4">
          <VoteControls
            collectionId={id}
            currentVote={currentVote}
            size={settings.collectionLayout === "grid" ? "medium" : "small"}
          />
        </div>

        <Tooltip content="Votes" position="top">
          <div className="flex items-center">
            <span className="font-bold">{votes.length}</span>
            <BarChart2 size={16} />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
