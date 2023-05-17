"use client";

import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { List, Columns, Grid } from "react-feather";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

const toggleGroupItemClasses =
  "data-[state=on]:bg-blue data-[state=on]:text-white flex h-full w-[33%] items-center justify-center bg-white first:rounded-l-lg last:rounded-r-lg focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-background focus:outline-none";

export default function ViewToggle(props: IProps) {
  return (
    <ToggleGroup.Root
      className="input h-full w-full inline-flex items-center"
      type="single"
      defaultValue="center"
      aria-label="Text alignment"
    >
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="left"
        aria-label="Left aligned"
      >
        <List />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="center"
        aria-label="Center aligned"
      >
        <Columns />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="right"
        aria-label="Right aligned"
      >
        <Grid />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
