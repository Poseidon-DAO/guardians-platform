import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { getUserSettings } from "@/lib/server";
import { type Collection } from "@/lib/server/collection";

import { VoteControls } from "../../vote-controls";
import { Text } from "../../text";

interface IProps extends React.PropsWithChildren, Collection {}

export default async function Row({
  id,
  image,
  description,
  title,
  votes,
  createdBy,
}: IProps) {
  const settings = await getUserSettings();
  const currentVote = votes.find(
    (vote) => vote.userId === cookies().get("userId")?.value
  );

  return (
    <Link href={`/collection/${id}`}>
      <div className="bg-white dark:bg-background overflow-hidden p-4 flex items-center justify-between rounded-lg dark:border-[1.5px] border-[1.5px] border-line dark:border-darkBorder my-4">
        <div className="relative w-60 h-32">
          <Image
            fill
            src={image}
            alt={description}
            className="object-cover object-center rounded-lg transition transform duration-500 hover:scale-105"
            sizes="15rem"
          />
        </div>

        <Text className="w-1/4 text-left">{title}</Text>
        <Text className="w-1/4 text-left">{createdBy}</Text>

        <div className="my-4">
          <VoteControls
            collectionId={id}
            currentVote={currentVote}
            size="small"
            theme={settings.theme}
          />
        </div>
      </div>
    </Link>
  );
}
