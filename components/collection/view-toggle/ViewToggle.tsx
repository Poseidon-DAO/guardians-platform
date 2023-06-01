"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { List, Grid } from "react-feather";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps extends React.PropsWithChildren {
  layout: LayoutTypes;
  className?: string;
}

export type LayoutTypes = "grid" | "table" | "column";

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

const toggleGroupItemClasses =
  "data-[state=on]:bg-blue data-[state=on]:text-white flex h-full w-[33%] items-center justify-center bg-white first:rounded-l-lg last:rounded-r-lg focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-background focus:outline-none";

export default function ViewToggle({ layout }: IProps) {
  const router = useRouter();

  const [localLayout, setLocalLayout] = useState(layout);

  async function handleLayoutChange(value: LayoutTypes) {
    if (!!value) {
      setLocalLayout(value);
      const url = new URL("/user/settings", baseUrl);

      const res = await fetch(url.toString(), {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userId: "243547bd-61e5-4ebb-bcae-fbdb16ae3d4c",
          collectionLayout: value,
        }),
      });
      if (res.ok) {
        router.refresh();
      }
      // const settings = (await res.json()) as UserSettings;

      // setCollectionLayout(value as UiState["collectionLayout"]);
    }
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
        value="column"
        aria-label="Column view"
      >
        <Grid />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        className={toggleGroupItemClasses}
        value="grid"
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
