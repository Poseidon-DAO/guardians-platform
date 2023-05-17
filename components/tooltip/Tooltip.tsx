import { tooltipClasses, arrowClasses, VariantProps } from "./Tooltip.styles";

interface IProps extends React.PropsWithChildren, VariantProps {
  title?: string;
  className?: string;
}

export default function Tooltip({
  children,
  title,
  position,
  className,
}: IProps) {
  return (
    <div className="group inline-block relative">
      {children}

      <div className={tooltipClasses({ className, position })}>
        {title}
        <div className={arrowClasses({ className, position })} />
      </div>
    </div>
  );
}
