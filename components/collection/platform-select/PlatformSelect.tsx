"use client";

import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { forwardRef, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "react-feather";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { OPTIONS, QUERY_KEY } from "@/constants/collection/filters/platform";
import { createQueryString } from "@/utils/utils/url";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

export default function PlatformSelect(props: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const options = OPTIONS;

  const initialPlatformValue =
    searchParams.get(QUERY_KEY) || options.find((o) => o.value === "")?.value;

  const [platform, setPlatform] = useState(initialPlatformValue);

  function handleValueChange(value: string) {
    setPlatform(value);
    const url =
      pathname +
      "?" +
      createQueryString(searchParams, { name: QUERY_KEY, value });
    router.push(!value ? pathname : url);
  }

  return (
    <Select.Root value={platform} onValueChange={handleValueChange}>
      <Select.Trigger
        className="input w-full h-full inline-flex items-center justify-between rounded-lg px-[15px] relative"
        aria-label="Platform"
      >
        <Select.Value aria-label={platform} placeholder="Platform">
          {options.find((o) => o.value === platform)?.label}
        </Select.Value>
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
              {options.map(({ label, value }) => (
                <SelectItem key={label} value={value}>
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
          "leading-none rounded-lg flex items-center py-3 pl-[25px] relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blue dark:data-[highlighted]:bg-darkBorder data-[highlighted]:text-white",
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
