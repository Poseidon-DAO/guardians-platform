import { type UserSettings } from "@/types";

import { PlatformSelect } from "../platform-select";
import { Results } from "../results";
import { Search } from "../search";
import { ShowMyVotes } from "../show-my-votes";
import { SortSelect } from "../sort-select";
import { ViewToggle } from "../view-toggle";

interface IProps extends React.PropsWithChildren {
  settings: UserSettings;
  resultsCount: number;
  showN: number;
  className?: string;
}

export default function Header({ settings, resultsCount, showN }: IProps) {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-12 gap-6 ">
        <div className="w-full h-12 col-span-2 items-center">
          <ShowMyVotes checked={settings.showVotedCollection} />
        </div>

        <div className="w-full h-12 col-span-4">
          <Search />
        </div>

        <div className="w-full h-12 col-span-2">
          <PlatformSelect />
        </div>

        <div className="w-full h-12 col-span-2">
          <SortSelect />
        </div>

        <div className="w-full h-12 col-span-2">
          <ViewToggle layout={settings.collectionLayout} />
        </div>
      </div>

      <div className="mt-4 text-right">
        <Results resultsCount={resultsCount} showN={showN} />
      </div>
    </div>
  );
}
