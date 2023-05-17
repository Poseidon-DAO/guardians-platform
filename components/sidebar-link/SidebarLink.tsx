"use client";

import Link from "next/link";
import { Settings, User, Icon, Image, Send } from "react-feather";
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

export default function SidebarLink({ link }: IProps) {
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
        "w-full flex items-center p-2 rounded-lg my-1 hover:bg-blue hover:text-white",
        isActive && "bg-blue text-white"
      )}
    >
      <Card className="p-3">
        <Icon
          size={25}
          className="stroke-background transition duration-200 ease-in-out"
        />
      </Card>

      <Text className="pl-3 !text-inherit">{link.label}</Text>
    </Link>
  );
}
