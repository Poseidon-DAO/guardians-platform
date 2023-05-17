"use client";

import { Input } from "@/components/ui";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

export default function Search(props: IProps) {
  return (
    <div className="h-full">
      <Input className="w-full h-full" placeholder="Search for Collection" />
    </div>
  );
}
