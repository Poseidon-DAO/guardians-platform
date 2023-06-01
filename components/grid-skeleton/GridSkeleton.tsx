interface SkeletonProps {
  columns: number;
  itemsNumber?: number;
}

export function GridItem({ className }: { className?: string }) {
  return (
    <div
      className={[
        "aspect-square bg-gray-200 animate-pulse rounded-lg",
        className,
      ].join(" ")}
    />
  );
}

export default function GridSkeleton({
  columns,
  itemsNumber = 3,
}: SkeletonProps) {
  const elements = Array.from({ length: itemsNumber }).map((_, i) => i);

  return (
    <div className={`grid grid-cols-${columns} p-6 gap-6`}>
      {elements.map((el) => (
        <GridItem key={el} />
      ))}
    </div>
  );
}
