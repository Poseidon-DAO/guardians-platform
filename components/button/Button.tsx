import clsx from "clsx";

import { classes, VariantProps } from "./Button.styles";

interface IProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps {}

export default function Button({
  intent,
  size,
  colorScheme,
  className,
  children,
  disabled,
  ...props
}: IProps) {
  return (
    <span className={clsx(null, disabled && "cursor-not-allowed")}>
      <button
        className={classes({
          className,
          intent,
          size,
          colorScheme,
          disabled,
        })}
        {...props}
      >
        {children}
      </button>
    </span>
  );
}
