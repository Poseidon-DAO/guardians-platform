import { X } from "react-feather";
import { ChangeEvent } from "react";

import { classes, VariantProps } from "./Input.styles";
import { Spinner } from "../spinner";

interface IProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps {
  isLoading?: boolean;
  onClear?: () => void;
}

export default function Input({
  size,
  className,
  isLoading,
  children,
  onClear,
  ...props
}: IProps) {
  function handleClear() {
    props.onChange?.({
      target: { value: "" },
    } as ChangeEvent<HTMLInputElement>);
    onClear?.();
  }

  return (
    <div className="h-full">
      <input
        className={[classes({ size, className }), "relative"].join(" ")}
        {...props}
      >
        {children}
      </input>

      <div className="absolute top-1/2 flex items-center right-0 transform -translate-x-4 -translate-y-1/2">
        {isLoading && <Spinner size="small" />}

        {!!props.value && (
          <X
            width={24}
            height={24}
            className="cursor-pointer ml-4"
            onClick={handleClear}
          />
        )}
      </div>
    </div>
  );
}
