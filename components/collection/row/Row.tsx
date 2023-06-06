import Image from "next/image";
import { cookies } from "next/headers";
import { type Collection } from "@/lib/server/collection";

import { VoteControls } from "../../vote-controls";
import { Text } from "../../text";

interface IProps extends React.PropsWithChildren, Collection {}

export default function Row({
  id,
  image,
  description,
  title,
  votes,
  createdBy,
}: IProps) {
  const currentVote = votes.find(
    (vote) => vote.userId === cookies().get("userId")?.value
  );

  return (
    <div className="overflow-hidden p-4 flex items-center justify-between border-b-[1px] last:border-b-0 border-b-line">
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
        />
      </div>
    </div>
  );
}
