import { PlatformSelect } from "../platform-select";
import { Search } from "../search";
import { ShowMyVotes } from "../show-my-votes";
import { SortSelect } from "../sort-select";
import { ViewToggle } from "../view-toggle";

export type SortType = "most-voted" | "most-loved" | "most-hated";

interface IProps extends React.PropsWithChildren {
  // sort?: SortType;
  className?: string;
}

export default function Header(props: IProps) {
  return (
    <div className="grid grid-cols-12 gap-6 mb-6">
      <div className="w-full h-12 col-span-2 items-center">
        <ShowMyVotes />
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
        <ViewToggle />
      </div>
    </div>
  );
}
