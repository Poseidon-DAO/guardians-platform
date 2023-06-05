"use client";

import { type ComponentProps } from "react";
import { useAccount } from "wagmi";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { useUserStore } from "@/zustand/user";

import { Button } from "../button";
import { Text } from "../text";
import { Tooltip } from "../ui";

interface IProps extends React.PropsWithChildren {
  collectionId: string;
  size?: ComponentProps<typeof Button>["size"];
}

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;
const url = new URL("/collection/vote", baseUrl);

async function handleVote({
  collectionId,
  userAddress,
  vote,
}: {
  collectionId: string;
  userAddress: string;
  vote: "UPVOTE" | "DOWNVOTE";
}) {
  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      collectionId,
      userAddress,
      vote,
    }),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res;
}

export default function VoteControls({ collectionId, size }: IProps) {
  const user = useUserStore((state) => state.user);

  const { address } = useAccount();

  async function handleDrop() {
    if (!address) return;

    await handleVote({
      collectionId,
      userAddress: address,
      vote: "DOWNVOTE",
    });
  }

  async function handleHold() {
    if (!address) return;

    await handleVote({
      collectionId,
      userAddress: address,
      vote: "UPVOTE",
    });
  }

  return (
    <Tooltip content="You must be a Guardian in order to vote!">
      <div className="flex">
        <div className="mr-2">
          <Button
            size={size}
            intent="outline"
            colorScheme="blue"
            onClick={handleDrop}
            disabled={!user?.isGuardian}
          >
            <div className="flex items-center">
              <ThumbsDown className="mr-2" width={18} height={18} />
              <Text>Drop</Text>
            </div>
          </Button>
        </div>

        <div className="mr-2">
          <Button
            size={size}
            intent="contained"
            colorScheme="blue"
            onClick={handleHold}
            disabled={!user?.isGuardian}
          >
            <div className="flex items-center">
              <ThumbsUp className="mr-2" width={18} height={18} />
              <Text>Hold</Text>
            </div>
          </Button>
        </div>
      </div>
    </Tooltip>
  );
}
