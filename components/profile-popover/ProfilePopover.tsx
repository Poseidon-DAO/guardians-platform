"use client";

import { User } from "react-feather";
import { useRouter } from "next/navigation";
import { Button } from "../button";

export type ThemeTypes = "dark" | "light";

interface IProps {}

export default function ProfilePopover(props: IProps) {
  const router = useRouter();

  function handleClick() {}

  return (
    <Button
      intent="contained"
      size="small"
      colorScheme="white"
      className="!input !w-10 !h-10 flex items-center justify-center"
      onClick={handleClick}
    >
      <div className="border-2 border-background rounded-full">
        <User className="text-background" size={18} />
      </div>
    </Button>
  );
}
