import clsx from "clsx";

interface IProps extends React.PropsWithChildren {
  className?: string;
}

export default function Card({ className, children }: IProps) {
  return (
    <div className={clsx("rounded-lg drop-shadow-xl bg-white", className)}>
      {children}
    </div>
  );
}
