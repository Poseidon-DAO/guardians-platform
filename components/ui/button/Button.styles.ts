import { cva, VariantProps as CvaVariantProps } from "class-variance-authority";

export const classes = cva(
  [
    "rounded-lg",
    "font-bold",
    "active:scale-100",
    "transition",
    "duration-100",
    "ease-in-out",
    "border-2",
    "hover:scale-[1.02]",
    "h-full",
    "flex",
    "items-center",
  ],
  {
    variants: {
      intent: {
        contained: "text-white border-transparent",
        outline: "bg-white hover:bg-line",
        text: "bg-transparent hover:bg-gray-200 border-transparent",
      },
      size: {
        small: "text-md py-1 px-2",
        medium: "text-lg px-6 py-2",
        large: "text-xlg px-8 py-4",
      },
      colorScheme: {
        blue: "text-blue",
        red: "text-red",
        indigo: "text-background",
        white: "text-white",
      },
      disabled: {
        true: "pointer-events-none opacity-60",
        false: "",
      },
    },
    compoundVariants: [
      {
        intent: "contained",
        colorScheme: "blue",
        className: "bg-blue hover:bg-blue/90",
      },
      {
        intent: "outline",
        colorScheme: "blue",
        className: "border-blue",
      },
      {
        intent: "contained",
        colorScheme: "red",
        className: "bg-red hover:bg-red/90",
      },
      {
        intent: "outline",
        colorScheme: "red",
        className: "border-red",
      },
      {
        intent: "contained",
        colorScheme: "indigo",
        className:
          "bg-background hover:bg-background/90 dark:border-darkBorder",
      },
      {
        intent: "outline",
        colorScheme: "indigo",
        className: "border-background",
      },
      {
        intent: "contained",
        colorScheme: "white",
        className: "bg-white !text-background",
      },
      {
        intent: "outline",
        colorScheme: "white",
        className: "border-white !text-background",
      },
    ],
    defaultVariants: {
      intent: "contained",
      size: "medium",
      colorScheme: "red",
      disabled: false,
    },
  }
);

export type VariantProps = CvaVariantProps<typeof classes>;
