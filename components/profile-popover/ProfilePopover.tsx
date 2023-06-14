"use client";

import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { useState } from "react";
import { BarChart, Briefcase, Box, User } from "react-feather";

import SwitchTheme, { type ThemeTypes } from "../switch-theme/SwitchTheme";

import { Button, Text } from "../ui";

interface IProps {
  theme?: ThemeTypes;
}

const menuOptions = [
  { icon: BarChart, label: "Analytics", linkTo: "/analytics" },
  { icon: Briefcase, label: "Collection", linkTo: "/collection" },
  { icon: Box, label: "My votes", linkTo: "/my-votes" },
];

export default function ProfilePopover({ theme }: IProps) {
  const [open, setOpen] = useState(false);

  function handleMouseEnter() {
    setOpen(true);
  }

  function handleMouseLeave() {
    setOpen(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        asChild
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button
          intent="contained"
          colorScheme={theme === "light" ? "white" : "indigo"}
        >
          <div className="border-[3px] border-background dark:border-white rounded-full">
            <User
              className="text-background dark:text-white"
              size={18}
              strokeWidth="3"
            />
          </div>
        </Button>
      </Popover.Trigger>

      <Popover.Content
        align="end"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="pt-2"
      >
        <div className="p-[8px] overflow-hidden bg-white dark:bg-darkPopover rounded-lg shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          {menuOptions.map((option) => (
            <Link
              key={option.label}
              href={option.linkTo}
              onClick={handleMouseLeave}
            >
              <div className="flex items-center py-3 pl-[25px] pr-[10px] rounded-lg hover:bg-blue hover:text-white dark:hover:bg-darkBorder cursor-pointer">
                <option.icon className="mr-4" />
                <Text>{option.label}</Text>
              </div>
            </Link>
          ))}

          <SwitchTheme theme={theme} />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
