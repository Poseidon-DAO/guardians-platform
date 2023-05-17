"use client";

import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { forwardRef, useCallback, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "react-feather";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

const options = [
  {
    value: "",
    label: "All",
  },
  {
    value: "superrare",
    label: "SuperRare",
  },
  {
    value: "foundation",
    label: "Foundation",
  },
  {
    value: "nifty-gateway",
    label: "Nifty Gateway",
  },
  {
    value: "opensea",
    label: "OpenSea",
  },
];

export default function PlatformSelect(props: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [platform, setPlatform] = useState(
    options.find((o) => o.label === "All")?.value
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleValueChange(value: string) {
    console.log("changed");
    setPlatform(value);

    if (!platform) return;

    const url = pathname + "?" + createQueryString("platfrom", platform);
    router.push(url);
    router.refresh();
    router.replace(url);
  }

  console.log({ platform, searchParams });

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
          className="w-popper-width overflow-hidden bg-white rounded-lg shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
            <ChevronUp />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-[5px]">
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
          "leading-none rounded-lg flex items-center py-3 pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blue data-[highlighted]:text-white",
          className
        )}
        {...props}
        ref={forwardedRef}
        onClick={() => console.log("clicked")}
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
