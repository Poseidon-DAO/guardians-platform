"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "react-feather";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

export default function ShowMyVotes(props: IProps) {
  return (
    <form className="h-full">
      <div className="flex items-center h-full cursor-pointer">
        <Checkbox.Root
          className="flex h-[16px] w-[16px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] shadow-background focus:shadow-background"
          defaultChecked
          id="c1"
        >
          <Checkbox.Indicator className="text-blue">
            <Check width={16} height={16} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="pl-[15px] text-[15px] leading-none " htmlFor="c1">
          Show voted collections
        </label>
      </div>
    </form>
  );
}
