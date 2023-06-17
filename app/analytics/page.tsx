import { Suspense } from "react";
import {
  // BoughtCollectionsChart,
  // SoldCollectionsChart,
  CollectedCollectionsChart,
  TrendingTable,
  VotedCollectionsChart,
} from "@/components/analytics";
import { getVoteStats } from "@/lib/server/vote-stats";
import { getUserSettings } from "@/lib/server";

const containerClasses =
  "bg-white dark:bg-background overflow-hidden rounded-lg dark:border-[1.5px] border-[1.5px] border-line dark:border-darkBorder";

export default async function Analytics() {
  const votedCollectionsData = await getVoteStats({ days: 30 });
  const userSettings = await getUserSettings();

  return (
    <div className="p-6 w-screen min-h-[92vh]">
      <div className="flex items-center justify-between gap-6 mb-24">
        <div className="flex-1">
          <Suspense fallback={<div>dsjkndsajnk</div>}>
            {/* @ts-ignore */}
            <TrendingTable trend="loved" />
          </Suspense>
        </div>

        <div className="flex-1">
          <Suspense fallback={<div>dsjkndsajnk</div>}>
            {/* @ts-ignore */}
            <TrendingTable trend="hated" />
          </Suspense>
        </div>
      </div>

      <div className="grid grid-cols-2 w-full gap-6">
        {!!votedCollectionsData?.length && (
          <div
            className={["w-full aspect-video p-3", containerClasses].join(" ")}
          >
            <VotedCollectionsChart
              theme={userSettings?.theme}
              data={votedCollectionsData}
            />
          </div>
        )}

        {!!votedCollectionsData?.length && (
          <div
            className={["w-full aspect-video p-3", containerClasses].join(" ")}
          >
            <CollectedCollectionsChart
              theme={userSettings?.theme}
              data={votedCollectionsData}
            />
          </div>
        )}

        {/* <div className={["w-full aspect-video", containerClasses].join(" ")}>
           <BoughtCollectionsChart /> 
        </div>
        <div className={["w-full aspect-video", containerClasses].join(" ")}>
           <SoldCollectionsChart /> 
        </div> */}
      </div>
    </div>
  );
}
