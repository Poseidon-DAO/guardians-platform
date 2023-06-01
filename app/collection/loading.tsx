import GridSkeleton, {
  GridItem,
} from "@/components/grid-skeleton/GridSkeleton";
import { getUserSettings } from "@/lib/server";

export default async function CollectionSkeleton() {
  const settings = await getUserSettings();

  const columns = settings.collectionLayout === "grid" ? 3 : 5;

  return (
    <div className="w-screen h-screen">
      <GridItem className="w-[calc(100%-3rem)] h-[8vh] mx-6 mt-6" />
      <GridSkeleton columns={columns} itemsNumber={30} />
    </div>
  );
}
