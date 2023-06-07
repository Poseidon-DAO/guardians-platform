"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";
import { Check } from "react-feather";

import useRevalidate from "@/lib/client/useRevalidate";
import useSettings from "@/lib/client/useSettings";
import { useUserStore } from "@/zustand/user";

interface IProps extends React.PropsWithChildren {
  checked: boolean;
  onChange?: (event: Checkbox.CheckedState) => void;
  className?: string;
}

export default function ShowMyVotes({ checked }: IProps) {
  const { mutate: revalidate } = useRevalidate();
  const { mutate: setSettings } = useSettings({
    onSuccess: () => revalidate("collection"),
  });

  const user = useUserStore((state) => state.user);

  const [localChecked, setLocalChecked] = useState(checked);

  async function handleChange(status: boolean) {
    if (!user) return;
    setLocalChecked(status);
    setSettings({ status, userId: user?.id });
  }

  return (
    <form className="h-full">
      <div className="inline-flex items-center h-full cursor-pointer">
        <Checkbox.Root
          className="flex h-[16px] w-[16px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] shadow-background focus:shadow-background"
          id="c1"
          checked={localChecked}
          onCheckedChange={handleChange}
        >
          <Checkbox.Indicator className="text-blue">
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
