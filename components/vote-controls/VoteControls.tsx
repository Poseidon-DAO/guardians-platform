import { ComponentProps } from "react";
import { Button } from "../button";

interface IProps extends React.PropsWithChildren {
  size?: ComponentProps<typeof Button>["size"];
}

export default function VoteControls({ size }: IProps) {
  return (
    <div className="flex my-4">
      <div className="mr-2">
        <Button size={size} intent="contained">
          DROP
        </Button>
      </div>

      <div className="mr-2">
        <Button size={size} intent="outline">
          HOLD
        </Button>
      </div>
    </div>
  );
}
