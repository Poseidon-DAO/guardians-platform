"use client";

import * as Select from "@radix-ui/react-select";
import React from "react";
import clsx from "clsx";
import { Check, ChevronDown, ChevronUp } from "react-feather";

import { type SortType } from "../header/Header";

interface IProps extends React.PropsWithChildren {
  sort?: SortType;
  className?: string;
}

export default function SortSelect(props: IProps) {
  return (
    <Select.Root>
      <Select.Trigger
        className="input w-full h-full inline-flex items-center justify-between rounded-lg px-[15px] relative"
        aria-label="Sort"
      >
        <Select.Value placeholder="Sort by" />
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="w-popper-width overflow-hidden bg-white rounded-lg shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
            <ChevronUp />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="px-[25px] text-xs py-2 leading-[25px] text-background/60">
                Popularity
              </Select.Label>
              <SelectItem value="most-voted">Most voted</SelectItem>
              <SelectItem value="most-loved">Most loved</SelectItem>
              <SelectItem value="most-hated">Most hated</SelectItem>
            </Select.Group>

            <Select.Separator className="h-[1px] bg-background/20 m-[5px]" />

            <Select.Group>
              <Select.Label className="px-[25px] text-xs py-2 leading-[25px] text-background/60">
                Price
              </Select.Label>
              <SelectItem value="desc">High to low</SelectItem>
              <SelectItem value="asc">Low to high</SelectItem>
            </Select.Group>

            <Select.Separator className="h-[1px] bg-background/20 m-[5px]" />

            <Select.Group>
              <Select.Label className="px-[25px] text-xs py-2 leading-[25px] text-background/60">
                Time bought
              </Select.Label>
              <SelectItem value="recently">Recently</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
            <ChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

interface Props extends React.PropsWithChildren {
  value: string;
  className?: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement | null, Props>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={clsx(
          "leading-none rounded-lg flex items-center py-3 pr-14 pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blue data-[highlighted]:text-white",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <Check width={16} height={16} />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";
