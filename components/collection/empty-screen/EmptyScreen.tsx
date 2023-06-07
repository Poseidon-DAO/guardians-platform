import { Text } from "@/components/text";

export default function EmptyScreen() {
  return (
    <div className="h-[72vh] flex flex-col items-center justify-center text-purple">
      <Text intent="h1">No results found :(</Text>
      <Text className="mt-6">Try searching for something else</Text>
    </div>
  );
}
