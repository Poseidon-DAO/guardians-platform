"use client";

import * as Popover from "@radix-ui/react-popover";
import { User } from "react-feather";
import { useRouter } from "next/navigation";

import SwitchTheme, { type ThemeTypes } from "../switch-theme/SwitchTheme";

import { Button } from "../button";

interface IProps {
  theme?: ThemeTypes;
}

export default function ProfilePopover({ theme }: IProps) {
  const router = useRouter();

  function handleClick() {}

  function handleOpen() {}

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          intent="contained"
          colorScheme={theme === "light" ? "white" : "indigo"}
          size="small"
          className="input !w-10 !h-10 flex justify-center items-center"
        >
          <div className="border-2 border-background dark:border-white rounded-full">
            <User className="text-background dark:text-white" size={18} />
          </div>
        </Button>
      </Popover.Trigger>

      <Popover.Content
        className="p-5 overflow-hidden bg-white dark:bg-darkPopover rounded-lg shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        sideOffset={8}
        align="end"
      >
        <div></div>
        <div>
          <SwitchTheme theme={theme} />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
