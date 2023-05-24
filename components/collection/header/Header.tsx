import { type UserSettings, type CustomNextPage } from "@/types";

import { PlatformSelect } from "../platform-select";
import { Search } from "../search";
import { ShowMyVotes } from "../show-my-votes";
import { SortSelect } from "../sort-select";
import { ViewToggle } from "../view-toggle";

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

interface IProps extends React.PropsWithChildren {
  settings: UserSettings;
  className?: string;
}

export default function Header({ settings }: IProps) {
  return (
    <div className="grid grid-cols-12 gap-6 mb-6">
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
  );
}
