import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "react-feather";
import { Button, Text } from "@/components/ui";
import { getCollection, getUserSettings } from "@/lib/server";
import { revalidateTag } from "next/cache";

interface IProps {
  trend: "loved" | "hated";
}

const containerClasses =
  "bg-white dark:bg-background overflow-hidden rounded-lg dark:border-[1.5px] border-[1.5px] border-line dark:border-darkBorder";

export default async function TrendingTable({ trend }: IProps) {
  const data = await getCollection({
    pageSize: "5",
    sort: "most-" + trend,
  });
  const settings = await getUserSettings();

  if (!!data?.collection) {
    revalidateTag("collection");
  }

  if (!data?.collection.length) {
    return <div className={containerClasses}>No data</div>;
  }

  return (
    <div>
      <div className={containerClasses}>
        <Text intent="h5" className="text-center py-3">
          Most {trend} pieces
        </Text>
      </div>

      <div className={containerClasses + " my-3"}>
        {data?.collection.map(
          ({ id, image, description, title, createdBy, votes }, index) => {
            const upvotes = votes.filter((v) => v.vote === "UPVOTE");
            const downvotes = votes.filter((v) => v.vote === "DOWNVOTE");

            return (
              <div key={id} className="flex items-center p-2">
                <div className="relative w-40 h-20 border-[1.5px] border-line dark:border-darkBorder rounded-lg bg-line dark:bg-darkPopover">
                  <Image
                    fill
                    src={image}
                    alt={description}
                    className="object-contain rounded-lg"
                    sizes="10rem"
                  />
                </div>

                <Text className="flex-1 mx-2 font-medium">{title}</Text>

                <div className="w-auto flex items-center justify-between mx-2 font-medium">
                  <div className="flex items-center mr-8">
                    <Text>{downvotes.length}</Text>
                    <ArrowDown />
                  </div>
                  <div className="flex items-center mr-2">
                    <ArrowUp />
                    <Text>{upvotes.length}</Text>
                  </div>
                </div>

                <div className="w-auto mx-2">
                  <Link href={`/collection/${id}`}>
                    <Button
                      size="small"
                      colorScheme={settings?.theme === "light" ? "blue" : "red"}
                    >
                      Show
                    </Button>
                  </Link>
                </div>
              </div>
            );
          }
        )}
      </div>

      <div className={containerClasses}>
        <div className="flex justify-center py-3">
          <Link href={`/collection?sort=most-${trend}`}>
            <Button colorScheme={settings?.theme === "light" ? "blue" : "red"}>
              Show all
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
