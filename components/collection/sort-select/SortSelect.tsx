"use client";

import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { forwardRef, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "react-feather";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  POPULARITY_OPTIONS,
  PRICE_OPTIONS,
  QUERY_KEY,
  TIME_OPTIONS,
} from "@/constants/collection/filters/sort";
import { createQueryString } from "@/utils/utils/url";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

export default function SortSelect(props: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const popularityOptions = POPULARITY_OPTIONS;
  const priceOptions = PRICE_OPTIONS;
  const timeOptions = TIME_OPTIONS;

  const initialSortValue = searchParams.get(QUERY_KEY) || undefined;

  const [sort, setSort] = useState(initialSortValue);

  function handleValueChange(value: string) {
    setSort(value);
    const url =
      pathname +
      "?" +
      createQueryString(searchParams, { name: QUERY_KEY, value });
    router.push(!value ? pathname : url);
  }

  return (
    <Select.Root value={sort} onValueChange={handleValueChange}>
      <Select.Trigger
        className="input w-full h-full inline-flex items-center justify-between rounded-lg px-[15px] relative"
        aria-label="Sort"
      >
        <Select.Value placeholder="Sort by" aria-label={sort} />

        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="w-select-width z-[2] overflow-hidden bg-white dark:bg-darkPopover rounded-lg shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
            <ChevronUp />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-[8px]">
            <Select.Group>
              <Select.Label className="px-[25px] text-xs py-2 leading-[25px] text-background/60 dark:text-white/60">
                Popularity
              </Select.Label>
              {popularityOptions.map(({ label, value, disabled }) => (
                <SelectItem
                  key={label}
                  value={value}
                  disabled={disabled}
                  className="data-[disabled]:text-purple dark:data-[disabled]:text-purple/60"
                >
                  {label}
                </SelectItem>
              ))}
            </Select.Group>

            <Select.Separator className="h-[1px] bg-background/20 m-[5px]" />

            <Select.Group>
              <Select.Label className="px-[25px] text-xs py-2 leading-[25px] text-background/60 dark:text-white/80">
                Price
              </Select.Label>
              {priceOptions.map(({ label, value, disabled }) => (
                <SelectItem
                  key={label}
                  value={value}
                  disabled={disabled}
                  className="data-[disabled]:text-purple dark:data-[disabled]:text-purple/60"
                >
                  {label}
                </SelectItem>
              ))}
            </Select.Group>

            <Select.Separator className="h-[1px] bg-background/20 m-[5px]" />

            <Select.Group>
              <Select.Label className="px-[25px] text-xs py-2 leading-[25px] text-background/60 dark:text-white/80">
                Time bought
              </Select.Label>
              {timeOptions.map(({ label, value, disabled }) => (
                <SelectItem
                  key={label}
                  value={value}
                  disabled={disabled}
                  className="data-[disabled]:text-purple dark:data-[disabled]:text-purple/60"
                >
                  {label}
                </SelectItem>
              ))}
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

const SelectItem = forwardRef<HTMLDivElement | null, Props>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={clsx(
          "leading-none rounded-lg flex items-center py-3 pr-14 pl-[25px] relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blue dark:data-[highlighted]:bg-darkBorder data-[highlighted]:text-white",
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
