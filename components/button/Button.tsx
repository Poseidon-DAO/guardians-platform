import { classes, VariantProps } from "./Button.styles";

interface IProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps {}

export default function Button({
  intent,
  size,
  colorScheme,
  className,
  children,
  ...props
}: IProps) {
  return (
    <button
      className={classes({ className, intent, size, colorScheme })}
      {...props}
    >
      {children}
    </button>
  );
}
