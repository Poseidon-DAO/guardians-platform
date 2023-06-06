import clsx from "clsx";
import { Spinner } from "../ui";

import { classes, VariantProps } from "./Button.styles";

interface IProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps {
  isLoading?: boolean;
}

export default function Button({
  intent,
  size,
  colorScheme,
  className,
  children,
  disabled,
  isLoading = false,
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
        {isLoading ? <Spinner size="small" className="mx-2" /> : children}
      </button>
    </span>
  );
}
