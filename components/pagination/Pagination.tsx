"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

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

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

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
    if (!value) return;

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

  const lastPage = paginationItems[paginationItems.length - 1];

  return (
    <div className="text-center">
      <nav className="h-12 inline-flex justify-between">
        <Button
          intent="text"
          colorScheme="indigo"
          className="rounded-r-none bg-white mr-[2px]"
          disabled={currentPage === 1}
          onClick={() => handleLayoutChange((currentPage - 1).toString())}
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
            const itemValue = item === 0 ? "..." : item;

            return (
              <ToggleGroup.Item
                key={index}
                className={[
                  toggleGroupItemClasses,
                  "mx-[1px] first:ml-0 last:mr-0",
                ].join(" ")}
                value={itemValue.toString()}
                aria-label="Table view"
                disabled={item === 0}
              >
                {itemValue}
              </ToggleGroup.Item>
            );
          })}
        </ToggleGroup.Root>

        <Button
          intent="text"
          colorScheme="indigo"
          className="rounded-l-none bg-white ml-[2px]"
          disabled={lastPage === currentPage}
          onClick={() => handleLayoutChange((currentPage + 1).toString())}
        >
          <ChevronRight />
        </Button>
      </nav>
    </div>
  );
}
