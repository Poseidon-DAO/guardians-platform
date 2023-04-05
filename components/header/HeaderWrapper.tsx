"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

interface IProps extends React.PropsWithChildren {}

export function HeaderWrapper({ children }: IProps) {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "w-full px-8 h-[8vh] flex items-center justify-between",
        pathname === "/" && "container mx-auto px-0"
      )}
    >
      {children}
    </div>
  );
}
