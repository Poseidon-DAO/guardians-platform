import { Text } from "@/components/text";

interface IProps extends React.PropsWithChildren {
  resultsCount: number;
  viewed: number;
}

export default function Results({ resultsCount, viewed }: IProps) {
  return (
    <div>
      <Text>
        You&apos;ve viewed <span className="font-bold">{viewed}</span> of{" "}
        <span className="font-bold">{resultsCount}</span> items
      </Text>
    </div>
  );
}
