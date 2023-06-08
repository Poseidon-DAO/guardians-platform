import { cva, VariantProps as CvaVariantProps } from "class-variance-authority";

export const classes = cva(["input px-4"], {
  variants: {
    size: {
      small: ["text-md", "py-1"],
      medium: ["text-md", "py-2"],
      large: ["text-lg", "py-4"],
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export type VariantProps = CvaVariantProps<typeof classes>;
