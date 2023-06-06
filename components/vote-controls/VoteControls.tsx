"use client";

import { ReactNode, type ComponentProps } from "react";
import { useAccount } from "wagmi";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { useUserStore } from "@/zustand/user";

import { type Vote } from "@/lib/server";
import useVote from "@/lib/client/useVote";

import { Button } from "../button";
import { Text } from "../text";
import { Tooltip } from "../ui";
import { useRouter } from "next/navigation";

interface IProps extends React.PropsWithChildren {
  collectionId: string;
  size?: ComponentProps<typeof Button>["size"];
  currentVote?: Vote;
}

export default function VoteControls({
  collectionId,
  size,
  currentVote,
}: IProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const { mutate: handleVote, isLoading: isVoting } = useVote({
    action: "vote",
    onSuccess: () => router.refresh(),
  });
  const { mutate: handleVoteChange, isLoading: isChangingVote } = useVote({
    action: "changeVote",
    onSuccess: () => router.refresh(),
  });
  const { mutate: handleVoteDelete, isLoading: isDeletingVote } = useVote({
    action: "deleteVote",
    onSuccess: () => router.refresh(),
  });

  const { address } = useAccount();

  const isDownvote = currentVote?.vote === "DOWNVOTE";
  const isUpvote = currentVote?.vote === "UPVOTE";

  const isLoading = isVoting || isChangingVote || isDeletingVote;

  const getVoteArgs = (vote: "UPVOTE" | "DOWNVOTE") => ({
    collectionId,
    userAddress: address as string,
    vote,
  });

  function handleDrop() {
    if (!address) return;
    if (isDownvote) return handleVoteDelete(getVoteArgs("DOWNVOTE"));
    if (isUpvote) return handleVoteChange(getVoteArgs("DOWNVOTE"));

    handleVote(getVoteArgs("DOWNVOTE"));
  }

  function handleHold() {
    if (!address) return;
    if (isUpvote) return handleVoteDelete(getVoteArgs("UPVOTE"));
    if (isDownvote) return handleVoteChange(getVoteArgs("UPVOTE"));

    handleVote(getVoteArgs("UPVOTE"));
  }

  function renderWithTooltip(tooltip: string, children: ReactNode) {
    if (tooltip) {
      return <Tooltip content={tooltip}>{children}</Tooltip>;
    }

    return <>{children}</>;
  }

  return renderWithTooltip(
    !user?.isGuardian ? "You must be a Guardian in order to vote!" : "",
    <div className="flex">
      <div className="mr-2">
        {renderWithTooltip(
          isDownvote ? "Remove vote" : "Down-vote",
          <Button
            size={size}
            intent="outline"
            colorScheme="blue"
            onClick={handleDrop}
            disabled={!user?.isGuardian}
            isLoading={isLoading}
            className={
              isDownvote ? "!bg-blue/10 font-extrabold" : "font-medium"
            }
          >
            <div className="flex items-center">
              <ThumbsDown
                width={isDownvote ? 20 : 18}
                height={isDownvote ? 20 : 18}
                className={`mr-2 ${
                  isDownvote ? "fill-current stroke-white" : ""
                }`}
              />
              <Text>Drop</Text>
            </div>
          </Button>
        )}
      </div>

      <div className="mr-2">
        {renderWithTooltip(
          isUpvote ? "Remove vote" : "Up-vote",
          <Button
            size={size}
            intent="outline"
            colorScheme="blue"
            onClick={handleHold}
            disabled={!user?.isGuardian}
            isLoading={isLoading}
            className={isUpvote ? "!bg-blue/10 font-extrabold" : "font-medium"}
          >
            <div className="flex items-center">
              <ThumbsUp
                width={isUpvote ? 20 : 18}
                height={isUpvote ? 20 : 18}
                className={`mr-2 ${
                  isUpvote ? "fill-current stroke-white" : ""
                }`}
              />
              <Text>Hold</Text>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
