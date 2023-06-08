"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";
import { List, Grid } from "react-feather";

import useSettings from "@/lib/client/useSettings";

interface IProps extends React.PropsWithChildren {
  layout: LayoutTypes;
  className?: string;
}

export type LayoutTypes = "grid" | "table" | "big-grid";

const toggleGroupItemClasses =
  "data-[state=on]:bg-blue data-[state=on]:text-white flex h-full flex-grow items-center justify-center bg-white first:rounded-l-lg last:rounded-r-lg focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-background focus:outline-none";

export default function ViewToggle({ layout }: IProps) {
  const { mutate: setSettings } = useSettings({
    fieldToUpdate: "collectionLayout",
  });

  const [localLayout, setLocalLayout] = useState(layout);

  async function handleLayoutChange(layout: LayoutTypes) {
    if (!layout) return;
    setLocalLayout(layout);
    setSettings({ fieldValue: layout });
  }

  return (
    <ToggleGroup.Root
      className="input h-full w-full inline-flex items-center"
      type="single"
      aria-label="Collection alignment"
      value={localLayout}
      onValueChange={handleLayoutChange}
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
        value="grid"
        aria-label="Column view"
      >
        <Grid />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="big-grid"
        aria-label="Grid view"
      >
        <div>
          {["1", "2", "3"].map((el) => (
            <div
              key={el}
              className="w-[5px] h-[5px] ml-[1.5px] mb-[1.5px] border-[1.5px] rounded-[1px] border-current"
            ></div>
          ))}
        </div>

        <div>
          {["1", "2", "3"].map((el) => (
            <div
              key={el}
              className="w-[5px] h-[5px] ml-[1.5px] mb-[1.5px] border-[1.5px] rounded-[1px] border-current"
            ></div>
          ))}
        </div>

        <div>
          {["1", "2", "3"].map((el) => (
            <div
              key={el}
              className="w-[5px] h-[5px] ml-[1.5px] mb-[1.5px] border-[1.5px] rounded-[1px] border-current"
            ></div>
          ))}
        </div>
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
