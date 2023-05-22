"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { List, Columns, Grid } from "react-feather";
import { type UiState, useUiStore } from "@/zustand/ui";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

const toggleGroupItemClasses =
  "data-[state=on]:bg-blue data-[state=on]:text-white flex h-full w-[33%] items-center justify-center bg-white first:rounded-l-lg last:rounded-r-lg focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-background focus:outline-none";

export default function ViewToggle(props: IProps) {
  const collectionLayout = useUiStore((state) => state.collectionLayout);
  const setCollectionLayout = useUiStore((state) => state.setCollectionLayout);

  return (
    <ToggleGroup.Root
      className="input h-full w-full inline-flex items-center"
      type="single"
      aria-label="Collection alignment"
      value={collectionLayout}
      onValueChange={(value) => {
        if (!!value) setCollectionLayout(value as UiState["collectionLayout"]);
      }}
    >
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="table"
        aria-label="Table view"
      >
        <List />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        className={[
          toggleGroupItemClasses,
          "border-l-[1px] border-r-[1px] border-line data-[state=on]:border-0",
        ].join(" ")}
        value="column"
        aria-label="Column view"
      >
        <Columns />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="grid"
        aria-label="Grid view"
      >
        <Grid />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
