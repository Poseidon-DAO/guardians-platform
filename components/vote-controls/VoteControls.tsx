"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { useAccount } from "wagmi";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { useUserStore } from "@/zustand/user";

import { type Vote } from "@/lib/server";
import useVote from "@/lib/client/useVote";
import useRevalidate from "@/lib/client/useRevalidate";

import { Button } from "../button";
import { Text } from "../text";
import { Tooltip } from "../ui";
import { type ThemeTypes } from "../switch-theme/SwitchTheme";

interface IProps extends React.PropsWithChildren {
  collectionId: string;
  currentVote?: Vote;
  theme?: ThemeTypes;
  size?: ComponentProps<typeof Button>["size"];
}

export default function VoteControls({
  collectionId,
  currentVote,
  theme,
  size,
}: IProps) {
  const { address } = useAccount();
  const user = useUserStore((state) => state.user);

  const { mutate: revalidateVote, isLoading: isRevalidatingVote } =
    useRevalidate();

  const { mutate: handleVote } = useVote({
    action: "vote",
    onSuccess: () => revalidateVote("collection"),
  });

  const { mutate: handleVoteChange, isLoading: isChangingVote } = useVote({
    action: "changeVote",
    onSuccess: () => revalidateVote("collection"),
  });

  const { mutate: handleVoteDelete } = useVote({
    action: "deleteVote",
    onSuccess: () => revalidateVote("collection"),
  });

  const [newVote, setNewVote] = useState<Partial<Vote> | undefined>();

  const isNewDownvote = newVote?.vote === "DOWNVOTE";
  const isCurrentDownvote = currentVote?.vote === "DOWNVOTE";

  const isNewUpvote = newVote?.vote === "UPVOTE";
  const isCurrentUpvote = currentVote?.vote === "UPVOTE";

  const isDownvoteLoading =
    (isNewDownvote && isRevalidatingVote) ||
    (isCurrentDownvote && isChangingVote && isRevalidatingVote);

  const isUpvoteLoading =
    (isNewUpvote && isRevalidatingVote) ||
    (isCurrentUpvote && isChangingVote && isRevalidatingVote);

  const getVoteArgs = (vote: "UPVOTE" | "DOWNVOTE") => ({
    collectionId,
    userAddress: address as string,
    vote,
  });

  function handleDrop() {
    if (!address) return;

    const vote = getVoteArgs("DOWNVOTE");
    setNewVote(vote);

    if (isCurrentDownvote) return handleVoteDelete(getVoteArgs("DOWNVOTE"));
    if (isCurrentUpvote) return handleVoteChange(getVoteArgs("DOWNVOTE"));

    handleVote(vote);
  }

  function handleHold() {
    if (!address) return;

    const vote = getVoteArgs("UPVOTE");
    setNewVote(vote);

    if (isCurrentUpvote) return handleVoteDelete(getVoteArgs("UPVOTE"));
    if (isCurrentDownvote) return handleVoteChange(getVoteArgs("UPVOTE"));

    handleVote(vote);
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
          isCurrentDownvote ? "Remove vote" : "Down-vote",
          <Button
            size={size}
            intent={theme === "light" ? "outline" : "contained"}
            colorScheme={theme === "light" ? "blue" : "indigo"}
            onClick={handleDrop}
            disabled={!user?.isGuardian}
            isLoading={isDownvoteLoading}
            className={
              isCurrentDownvote
                ? "bg-blue/10 font-extrabold dark:bg-darkBorder dark:border-2"
                : "font-medium dark:border-2 dark:border-darkBorder dark:bg-inherit"
            }
          >
            <div className="flex items-center">
              <ThumbsDown
                width={isCurrentDownvote ? 20 : 18}
                height={isCurrentDownvote ? 20 : 18}
                className={`mr-2 ${
                  isCurrentDownvote
                    ? "fill-current stroke-white dark:stroke-darkBorder"
                    : ""
                }`}
              />
              <Text>Drop</Text>
            </div>
          </Button>
        )}
      </div>

      <div className="mr-2">
        {renderWithTooltip(
          isCurrentUpvote ? "Remove vote" : "Up-vote",
          <Button
            size={size}
            intent={theme === "light" ? "outline" : "contained"}
            colorScheme={theme === "light" ? "blue" : "indigo"}
            onClick={handleHold}
            disabled={!user?.isGuardian}
            isLoading={isUpvoteLoading}
            className={
              isCurrentUpvote
                ? "bg-blue/10 font-extrabold dark:bg-darkBorder dark:border-2"
                : "font-medium dark:border-2 dark:border-darkBorder dark:bg-inherit"
            }
          >
            <div className="flex items-center">
              <ThumbsUp
                width={isCurrentUpvote ? 20 : 18}
                height={isCurrentUpvote ? 20 : 18}
                className={`mr-2 ${
                  isCurrentUpvote
                    ? "fill-current stroke-white dark:stroke-darkBorder"
                    : ""
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
