import { classes, VariantProps } from "./Text.styles";

interface IProps
  extends React.HTMLAttributes<HTMLHeadElement | HTMLParagraphElement>,
    VariantProps {}

export function Text({
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
        className={classes({ intent: HtmlElType, size, className, textColor })}
        {...props}
      >
        {children}
      </p>
    );
  }

  return (
    <HtmlElType
      className={classes({ intent: HtmlElType, size, className, textColor })}
      {...props}
    >
      {children}
    </HtmlElType>
  );
}
