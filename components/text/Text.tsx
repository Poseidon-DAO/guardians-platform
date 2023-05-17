import { classes, VariantProps } from "./Text.styles";

interface IProps
  extends React.HTMLAttributes<HTMLHeadElement | HTMLParagraphElement>,
    VariantProps {}

export default function Text({
  children,
  intent: HtmlElType,
  size,
  textColor,
  className,
  ...props
}: IProps) {
  if (HtmlElType === "text" || !HtmlElType) {
    return (
      <p
        className={classes({ intent: HtmlElType, size, textColor, className })}
        {...props}
      >
        {children}
      </p>
    );
  }

  return (
    <HtmlElType
      className={classes({ intent: HtmlElType, size, textColor, className })}
      {...props}
    >
      {children}
    </HtmlElType>
  );
}
