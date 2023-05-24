"use client";

import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ChevronLeft, ChevronRight } from "react-feather";

import { Button } from "@/components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/utils/utils/url";
import { usePagination } from "@/hooks";

export interface IProps extends React.PropsWithChildren {
  totalCount: number;
  page: number;
  pageSize: number;
  siblingCount?: number;
}

const toggleGroupItemClasses =
  "data-[state=on]:bg-blue data-[state=on]:text-white flex h-full w-14 items-center justify-center bg-white focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-background focus:outline-none";

export const QUERY_KEY = "page";

export default function Pagination({
  page,
  pageSize,
  siblingCount = 1,
  totalCount,
}: IProps) {
  const [currentPage, setCurrentPage] = useState(page);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paginationItems = usePagination({
    page: currentPage,
    pageSize,
    siblingCount,
    totalCount,
  });

  async function handleLayoutChange(value: string) {
    setCurrentPage(+value);

    const url =
      pathname +
      "?" +
      createQueryString(searchParams, { name: QUERY_KEY, value });
    router.push(url);
  }

  if (currentPage === 0 || paginationItems.length < 2) {
    return null;
  }

  let lastPage = paginationItems[paginationItems.length - 1];

  return (
    <div className="text-center pt-6">
      <nav className="h-12 inline-flex justify-between">
        <Button
          intent="text"
          colorScheme="indigo"
          className="rounded-r-none bg-white mr-[2px]"
        >
          <ChevronLeft />
        </Button>

        <ToggleGroup.Root
          className="h-full inline-flex items-center"
          type="single"
          aria-label="Collection alignment"
          value={currentPage.toString()}
          onValueChange={handleLayoutChange}
        >
          {paginationItems.map((item, index) => {
            return (
              <ToggleGroup.Item
                key={+item + index}
                className={[
                  toggleGroupItemClasses,
                  "mx-[1px] first:ml-0 last:mr-0",
                ].join(" ")}
                value={item.toString()}
                aria-label="Table view"
              >
                {item}
              </ToggleGroup.Item>
            );
          })}
        </ToggleGroup.Root>

        <Button
          intent="text"
          colorScheme="indigo"
          className="rounded-l-none bg-white ml-[2px]"
        >
          <ChevronRight />
        </Button>
      </nav>
    </div>
  );
}
