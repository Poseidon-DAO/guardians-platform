"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";
import { Check } from "react-feather";

import useRevalidate from "@/lib/client/useRevalidate";
import useSettings from "@/lib/client/useSettings";

interface IProps extends React.PropsWithChildren {
  checked: boolean;
  onChange?: (event: Checkbox.CheckedState) => void;
  className?: string;
}

export default function ShowMyVotes({ checked }: IProps) {
  const { mutate: revalidate } = useRevalidate();
  const { mutate: setSettings } = useSettings({
    fieldToUpdate: "showVotedCollection",
    onSuccess: () => revalidate("collection"),
  });

  const [localChecked, setLocalChecked] = useState(checked);

  async function handleChange(status: boolean) {
    setLocalChecked(status);
    setSettings({ fieldValue: status });
  }

  return (
    <form className="h-full">
      <div className="inline-flex items-center h-full cursor-pointer">
        <Checkbox.Root
          className="flex h-[16px] w-[16px] appearance-none items-center justify-center rounded-[4px] bg-white dark:bg-darkBorder shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] shadow-background focus:shadow-background"
          id="c1"
          checked={localChecked}
          onCheckedChange={handleChange}
        >
          <Checkbox.Indicator className="text-blue rounded-[4px] dark:bg-darkBorder dark:text-white ">
            <Check width={16} height={16} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label
          className="pl-[15px] text-[15px] leading-none cursor-pointer "
          htmlFor="c1"
        >
          Include voted collections
        </label>
      </div>
    </form>
  );
}
