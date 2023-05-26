"use client";

import { ComponentProps } from "react";
import { useAccount } from "wagmi";
import { ThumbsDown, ThumbsUp } from "react-feather";

import { Button } from "../button";

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
    <div className="flex my-4">
      <div className="mr-2">
        <Button
          size={size}
          intent="outline"
          colorScheme="blue"
          onClick={handleDrop}
        >
          <div className="">
            <ThumbsDown className="inline mr-2" width={18} height={18} /> DROP
          </div>
        </Button>
      </div>

      <div className="mr-2">
        <Button
          size={size}
          intent="contained"
          colorScheme="blue"
          onClick={handleHold}
        >
          <div>
            <ThumbsUp className="inline mr-2" width={18} height={18} /> HOLD
          </div>
        </Button>
      </div>
    </div>
  );
}
