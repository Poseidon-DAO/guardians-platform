import Image from "next/image";
import Link from "next/link";
import { ThumbsDown, ThumbsUp } from "react-feather";
import formatAddress from "@/utils/formatAddress";

import { type Collection } from "@/lib/server/collection";

import { Card } from "../../card";
import { Text } from "../../text";
import { VoteControls } from "../../vote-controls";

interface IProps extends React.PropsWithChildren {
  item: Collection;
  type?: "modal" | "page";
}

export default function Item({
  item: {
    id,
    image,
    description,
    title,
    createdBy,
    votes,
    platform,
    balance,
    platformAddress,
    tags,
    timeLastUpdated,
    tokenId,
    tokenType,
    tokenUriRaw,
  },
  type = "page",
}: IProps) {
  const downvotes = votes.filter((vote) => vote.vote === "DOWNVOTE");
  const upvotes = votes.filter((vote) => vote.vote === "UPVOTE");

  const isPage = type === "page";
  const hasLotsOfTags = tags.length > 12;

  return (
    <div className="flex h-full text-lg">
      <Card
        key={id}
        className="aspect-square relative overflow-hidden w-2/4 h-full"
      >
        <Image
          src={image}
          alt={description}
          priority
          fill
          className="object-cover object-center rounded-lg transition transform duration-500 hover:scale-110"
        />
      </Card>

      <div
        className={[
          "w-2/4 px-6 flex flex-col justify-between",
          isPage ? "pl-10" : "",
        ].join(" ")}
      >
        {/* author, title and stats*/}
        <div>
          <Text size={isPage ? "large" : "small"} className="line-clamp-1">
            {createdBy}
          </Text>
          <Text
            intent={isPage ? "h3" : "h4"}
            className="line-clamp-1"
            title={title}
          >
            {title}
          </Text>

          <div className="inline-flex items-center ">
            <div className="flex items-center mr-8">
              <ThumbsDown size={16} />
              <Text className="mx-[5px]" size={isPage ? "large" : "small"}>
                {downvotes.length}
              </Text>
              <Text size={isPage ? "large" : "small"}>
                {downvotes.length === 1 ? "Downvote" : "Downvotes"}
              </Text>
            </div>

            <div className="flex items-center">
              <ThumbsUp size={16} />
              <Text className="mx-[5px]" size={isPage ? "large" : "small"}>
                {upvotes.length}
              </Text>
              <Text size={isPage ? "large" : "small"}>
                {upvotes.length === 1 ? "Upvote" : "Upvotes"}
              </Text>
            </div>
          </div>
        </div>

        {/* description */}
        <div>
          <div className="font-bold mb-1">
            <Text intent={isPage ? "h5" : "h6"}>Description</Text>
          </div>

          <div
            className={`${
              isPage ? "h-[10.5rem]" : "h-[8.75rem]"
            } overflow-y-auto border-[1px] border-transparent`}
          >
            <Text intent={isPage ? "h5" : "h6"} className="font-light">
              {description}
            </Text>
          </div>
        </div>

        {/* details */}
        <div>
          <div className="font-bold mb-1">
            <Text intent={isPage ? "h5" : "h6"}>Details</Text>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Text intent={isPage ? "h5" : "h6"} className="font-light">
                Contract address
              </Text>
              <Link
                href={`https://etherscan.io/address/${platformAddress}`}
                target="_blank"
                className="text-blue font-medium"
              >
                <Text intent={isPage ? "h5" : "h6"}>
                  {formatAddress(platformAddress)}
                </Text>
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <Text intent={isPage ? "h5" : "h6"} className="font-light">
                Token id
              </Text>
              <Link
                href={tokenUriRaw}
                target="_blank"
                className="text-blue font-medium"
              >
                <Text intent={isPage ? "h5" : "h6"}>
                  {parseInt(tokenId, 16)}
                </Text>
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <Text intent={isPage ? "h5" : "h6"} className="font-light">
                Balance
              </Text>
              <Text className="font-medium" intent={isPage ? "h5" : "h6"}>
                {balance}
              </Text>
            </div>

            <div className="flex items-center justify-between">
              <Text intent={isPage ? "h5" : "h6"} className="font-light">
                Token standard
              </Text>
              <Text className="font-medium" intent={isPage ? "h5" : "h6"}>
                {tokenType}
              </Text>
            </div>

            <div className="flex items-center justify-between">
              <Text intent={isPage ? "h5" : "h6"} className="font-light">
                Platform
              </Text>
              <Text className="font-medium" intent={isPage ? "h5" : "h6"}>
                {platform}
              </Text>
            </div>

            <div className="flex items-center justify-between">
              <Text intent={isPage ? "h5" : "h6"} className="font-light">
                Last updated
              </Text>
              <Text className="font-medium" intent={isPage ? "h5" : "h6"}>
                {new Date(timeLastUpdated).toLocaleDateString("de-De")}
              </Text>
            </div>
          </div>
        </div>

        {/* tags */}
        {isPage && (
          <div>
            <div className="font-bold mb-2">
              <Text intent={isPage ? "h5" : "h6"}>Tags</Text>
            </div>

            <div className="flex flex-wrap">
              {tags.map((tag, i) => (
                <div
                  key={i}
                  className={`bg-purple 
                  ${hasLotsOfTags ? "px-3" : "px-4"}
                  ${hasLotsOfTags ? "mr-1" : "mr-2"} 
                  ${hasLotsOfTags ? "py-1" : "py-2"} 
                 
                  my-1 rounded-3xl`}
                >
                  <Text
                    textColor="white"
                    className={`font-medium  ${
                      hasLotsOfTags ? "text-[0.6rem]" : "text-[0.8rem]"
                    } `}
                  >
                    {tag}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <VoteControls collectionId={id} />
        </div>
      </div>
    </div>
  );
}
