import { type UserSettings } from "@/lib/server/user-settings";
import { type CustomNextPage } from "@/types";

import { ClearFilters } from "../clear-filters";
import { PlatformSelect } from "../platform-select";
import { Results } from "../results";
import { Search } from "../search";
import { ShowMyVotes } from "../show-my-votes";
import { SortSelect } from "../sort-select";
import { ViewToggle } from "../view-toggle";

interface IProps extends React.PropsWithChildren {
  resultsCount: number;
  searchParams: CustomNextPage["searchParams"];
  settings: UserSettings;
  viewed: number;
}

export default function Header({
  resultsCount,
  searchParams,
  settings,
  viewed,
}: IProps) {
  const hasSearchParams = !!searchParams && !!Object.keys(searchParams).length;

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="w-full h-12 col-span-2">
          <PlatformSelect />
        </div>

        <div className="w-full h-12 col-span-6">
          <Search />
        </div>

        <div className="w-full h-12 col-span-2">
          <SortSelect />
        </div>

        <div className="w-full h-12 col-span-2">
          <ViewToggle layout={settings?.collectionLayout} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {hasSearchParams && (
          <div className="w-full h-12 col-span-8 flex items-center">
            <ClearFilters />
          </div>
        )}

        <div
          className={`w-full h-12 ${
            hasSearchParams ? "col-span-2" : "col-span-10"
          }`}
        >
          <ShowMyVotes checked={settings?.showVotedCollection} />
        </div>

        <div className="w-full h-12 col-span-2 flex items-center justify-end">
          <Results resultsCount={resultsCount} viewed={viewed} />
        </div>
      </div>
    </div>
  );
}
