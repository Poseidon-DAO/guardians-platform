"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";

interface IProps extends React.PropsWithChildren {
  className?: string;
  content?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: () => void;
  position?: "top" | "right" | "bottom" | "left";
}

export default function Tooltip({
  children,
  className,
  content,
  defaultOpen,
  open,
  onOpenChange,
  position,
}: IProps) {
  return (
    <RadixTooltip.Provider
      delayDuration={0}
      {...(open && { open })}
      {...(defaultOpen && { defaultOpen })}
      {...(onOpenChange && { onOpenChange })}
    >
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <div>{children}</div>
        </RadixTooltip.Trigger>

        <RadixTooltip.Content
          side={position!}
          sideOffset={8}
          align="center"
          className={[
            "bg-background text-white text-center rounded-lg px-4 py-2 z-10",
            className,
          ].join(" ")}
        >
          {content}

          <RadixTooltip.Arrow
            width={11}
            height={5}
            className="fill-background"
          />
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
