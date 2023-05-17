import { Button } from "../button";

interface IProps extends React.PropsWithChildren {}

export default function VoteControls(props: IProps) {
  return (
    <div className="flex my-4">
      <div className="mr-2">
        <Button intent="contained">DROP</Button>
      </div>

      <div className="mr-2">
        <Button intent="outline">HOLD</Button>
      </div>
    </div>
  );
}
