import { GridSkeleton } from "@/components";
import { getUserSettings } from "@/lib/server";

export default async function Loading() {
  const settings = await getUserSettings(
    "243547bd-61e5-4ebb-bcae-fbdb16ae3d4c"
  );

  const columns = settings.collectionLayout === "grid" ? 3 : 5;

  return <GridSkeleton columns={columns} itemsNumber={30} />;
}
