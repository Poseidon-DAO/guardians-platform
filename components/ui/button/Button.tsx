import React, { forwardRef } from "react";
import clsx from "clsx";
import { Spinner } from "..";

import { classes, VariantProps } from "./Button.styles";

interface IProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      intent,
      size,
      colorScheme,
      className,
      children,
      disabled,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <span className={clsx(null, disabled && "cursor-not-allowed")}>
        <button
          ref={ref}
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
          {isLoading && <Spinner size="xs" className="mx-2" />}
        </button>
      </span>
    );
  }
);

Button.displayName = "Button";

export default Button;
