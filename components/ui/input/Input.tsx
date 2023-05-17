import { classes, VariantProps } from "./Input.styles";

interface IProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps {}

export default function Input({ size, className, children, ...props }: IProps) {
  return (
    <input className={classes({ size, className })} {...props}>
      {children}
    </input>
  );
}
