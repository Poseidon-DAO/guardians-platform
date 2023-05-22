import Image from "next/image";
import { Collection } from "@/types";

import { VoteControls } from "../../vote-controls";
import { Text } from "../../text";

interface IProps extends React.PropsWithChildren, Collection {}

export default function Row({
  id,
  image,
  description,
  title,
  createdBy,
}: IProps) {
  return (
    <div className="overflow-hidden p-4 flex items-center justify-between border-b-[1px] last:border-b-0 border-b-line">
      <div className="relative w-40 h-20">
        <Image
          src={image}
          alt={description}
          fill
          className="object-cover object-center rounded-lg transition transform duration-500 hover:scale-105"
        />
      </div>

      <Text className="w-1/4 text-left">{title}</Text>
      <Text className="w-1/4 text-left">{createdBy}</Text>

      <VoteControls size="small" />
    </div>
  );
}
