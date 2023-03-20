"use client";
import Link from "next/link";
import {
  Settings,
  User,
  Grid,
  Calendar,
  Icon,
  Image,
  Send,
} from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Text } from "../text";
import { Card } from "../card";

const icons: Record<string, Icon> = {
  Settings,
  User,
  Image,
  Send,
};

interface IProps {
  link: {
    label: string;
    link: string;
    icon: string;
  };
}

export function SidebarLink({ link }: IProps) {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link
      href={link.link}
      className={clsx(
        "w-full flex items-center p-2 rounded-lg hover:bg-blue/5 my-1",
        isActive && "bg-blue/10"
      )}
    >
      <Card className="p-3">
        <Icon
          size={25}
          className="stroke-pink transition duration-200 ease-in-out"
        />
      </Card>

      <Text className="pl-3" textColor="black">
        {link.label}
      </Text>
    </Link>
  );
}
