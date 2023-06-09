import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { getUserSettings } from "@/lib/server";
import { type Collection } from "@/lib/server/collection";

import { VoteControls } from "../../vote-controls";
import { Text } from "../../ui/text";

interface IProps extends React.PropsWithChildren, Collection {}

export default async function Row({
  id,
  image,
  description,
  title,
  votes,
  createdBy,
  tokenUriRaw,
  tokenId,
}: IProps) {
  const settings = await getUserSettings();
  const currentVote = votes.find(
    (vote) => vote.userId === cookies().get("userId")?.value
  );

  return (
    <Link href={`/collection/${id}`}>
      <div className="bg-white dark:bg-background overflow-hidden p-4 flex items-center rounded-lg dark:border-[1.5px] border-[1.5px] border-line dark:border-darkBorder my-4">
        <div className="relative w-80 mr-16 h-52 border-[1.5px] border-line dark:border-darkBorder rounded-lg bg-line dark:bg-darkBorder">
          <Image
            fill
            src={image}
            alt={description}
            className="object-contain rounded-lg transition transform duration-500 hover:scale-105"
            sizes="20rem"
          />
        </div>

        <Text className="flex-1 mx-2 font-medium">{title}</Text>
        <Text className="w-1/6 mx-2 font-medium">{createdBy}</Text>
        <Text className="w-1/6 mx-2 font-medium">{parseInt(tokenId, 16)}</Text>

        <div className="w-52 flex justify-end">
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
