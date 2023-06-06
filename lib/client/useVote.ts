import { useMutation } from "@tanstack/react-query";

type Action = "vote" | "changeVote" | "deleteVote";
type VoteData = {
  collectionId: string;
  userAddress: string;
  vote: "UPVOTE" | "DOWNVOTE";
};

const key: string = "/vote";
const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;
const url = new URL("/collection/vote", baseUrl);

async function voteAction(action: Action, voteData: VoteData) {
  const httpMethod = {
    vote: "POST",
    changeVote: "PATCH",
    deleteVote: "DELETE",
  }[action];

  let data: Partial<VoteData>;

  if (action === "deleteVote") {
    const { vote, ...deleteData } = voteData;
    data = deleteData;
  }

  const res = await fetch(url.toString(), {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    method: httpMethod,
    body: JSON.stringify(voteData),
  });
  return await res.json();
}

export default function useVote(
  { action, onSuccess }: { action: Action; onSuccess?: () => void } = {
    action: "vote",
  }
) {
  return useMutation({
    mutationFn: (data: VoteData) => voteAction(action, data),
    mutationKey: [key],
    onSuccess,
  });
}
