import { Vote } from "./collection";

export type VoteStats = {
  totalVotes: number;
  votes: Record<string, Vote[]>;
};

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

export async function getVoteStats(
  { days }: { days: 7 | 10 | 30 } = { days: 7 }
) {
  try {
    const url = new URL("/vote/stats", baseUrl);

    url.searchParams.append("days", days.toString());

    const res = await fetch(url.toString(), { cache: "no-store" });

    const data = (await res.json()) as VoteStats;

    const formatedVotes = Object.entries(data.votes).reduce<
      { date: string; votes: number; upvotes: number; downvotes: number }[]
    >((acc, [key, votes]) => {
      acc.push({
        date: key,
        votes: votes.length,
        upvotes: votes.filter((vote) => vote.vote === "UPVOTE").length,
        downvotes: votes.filter((vote) => vote.vote === "DOWNVOTE").length,
      });

      return acc;
    }, []);

    return formatedVotes;
  } catch (error) {
    console.error(error);
  }
}
