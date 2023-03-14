import { classes, VariantProps } from "./Button.styles";

interface IProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps {}

export function Button({
  intent,
  size,
  className,
  children,
  ...props
}: IProps) {
  return (
    <button className={classes({ intent, size, className })} {...props}>
      {children}
    </button>
  );
}
