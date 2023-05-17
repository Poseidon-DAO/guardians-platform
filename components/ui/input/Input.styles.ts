import { cva, VariantProps as CvaVariantProps } from "class-variance-authority";

export const classes = cva(["input"], {
  variants: {
    size: {
      small: ["text-md", "py-1", "px-2"],
      medium: ["text-lg", "px-6", "py-2"],
      large: ["text-xlg", "px-8", "py-4"],
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export type VariantProps = CvaVariantProps<typeof classes>;
