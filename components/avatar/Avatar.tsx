"use client";

import formatAddress from "@/utils/formatAddress";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Text } from "../text";

interface IProps extends React.PropsWithChildren {}

export function Avatar(props: IProps) {
  const { address } = useAccount();

  return (
    <div className="flex flex-nowrap items-center">
      <div className="w-24 h-24 relative">
        <Image
          src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg"
          alt="nft"
          fill
          className="object-cover object-center rounded-full border-[2px] border-red"
        />
      </div>

      <div className="ml-3 w-4/6">
        <Text
          intent="h4"
          textColor="black"
          className="text-ellipsis overflow-hidden whitespace-nowrap"
          title="Unnamed Account"
        >
          Unnamed Account
        </Text>
        <Text textColor="black" className="font-extrabold">
          {formatAddress(address as string)}
        </Text>
      </div>
    </div>
  );
}
