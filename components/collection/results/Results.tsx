import { Card } from "@/components/card";
import { Text } from "@/components/text";
import clsx from "clsx";

interface IProps extends React.PropsWithChildren {
  resultsCount: number;
  showN: number;
}

export default function Results({ resultsCount, showN }: IProps) {
  return (
    <div>
      <Text>
        Showing <span className="font-bold">{showN}</span> of{" "}
        <span className="font-bold">{resultsCount}</span> results
      </Text>
    </div>
  );
}
