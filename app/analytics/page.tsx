import { TrendingTable } from "@/components/analytics";
import { Suspense } from "react";

export default function Analytics() {
  return (
    <div className="p-6 w-screen min-h-[92vh]">
      <div className="flex items-center justify-between gap-6">
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
    </div>
  );
}
