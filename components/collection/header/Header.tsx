import { type UserSettings } from "@/lib/server/user-settings";

import { PlatformSelect } from "../platform-select";
import { Results } from "../results";
import { Search } from "../search";
import { ShowMyVotes } from "../show-my-votes";
import { SortSelect } from "../sort-select";
import { ViewToggle } from "../view-toggle";

interface IProps extends React.PropsWithChildren {
  settings: UserSettings;
  resultsCount: number;
  viewed: number;
  className?: string;
}

export default function Header({ settings, resultsCount, viewed }: IProps) {
  return (
    <div className="my-4">
      <div className="grid grid-cols-12 gap-6 ">
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
          <ViewToggle layout={settings.collectionLayout} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <ShowMyVotes checked={settings.showVotedCollection} />
        <Results resultsCount={resultsCount} viewed={viewed} />
      </div>
    </div>
  );
}
