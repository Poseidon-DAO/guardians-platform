"use client";

import { createQueryString } from "@/utils/utils/url";
import { useUserStore } from "@/zustand/user";
import * as Checkbox from "@radix-ui/react-checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check } from "react-feather";

interface IProps extends React.PropsWithChildren {
  checked: boolean;
  onChange?: (event: Checkbox.CheckedState) => void;
  className?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_PDN_API_BASE_URL!;

export default function ShowMyVotes({ checked }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const user = useUserStore((state) => state.user);

  const [localChecked, setLocalChecked] = useState(checked);

  async function handleChange(status: boolean) {
    setLocalChecked(status);
    const url = new URL("/user/settings", baseUrl);

    const res = await fetch(url.toString(), {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        showVotedCollection: status,
      }),
    });

    if (res.ok) {
      const url =
        pathname +
        "?" +
        createQueryString(searchParams, { name: "hideVotes", value: "true" });
      router.push(status === true ? pathname : url);

      // router.refresh();
    }
    // const settings = (await res.json()) as UserSettings;

    // setCollectionLayout(value as UiState["collectionLayout"]);
  }

  return (
    <form className="h-full">
      <div className="flex items-center h-full cursor-pointer">
        <Checkbox.Root
          className="flex h-[16px] w-[16px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] shadow-background focus:shadow-background"
          id="c1"
          checked={localChecked}
          onCheckedChange={handleChange}
        >
          <Checkbox.Indicator className="text-blue">
            <Check width={16} height={16} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="pl-[15px] text-[15px] leading-none " htmlFor="c1">
          Show voted collections
        </label>
      </div>
    </form>
  );
}
