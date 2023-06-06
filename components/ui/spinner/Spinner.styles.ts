import { cva, VariantProps as CvaVariantProps } from "class-variance-authority";

export const classes = cva(
  ["text-gray-100 animate-spin [&>path:nth-child(1)]:fill-line"],
  {
    variants: {
      size: {
        xs: "w-4 h-4",
        small: "w-6 h-6",
        medium: "w-8 h-8",
        large: "w-10 h-10",
      },
      color: {
        blue: "[&>path:nth-child(2)]:fill-blue",
        red: "[&>path:nth-child(2)]:fill-red",
        purple: "[&>path:nth-child(2)]:fill-purple",
        indigo: "[&>path:nth-child(2)]:fill-background",
        black: "[&>path:nth-child(2)]:fill-black",
      },
    },
    defaultVariants: {
      size: "medium",
      color: "blue",
    },
  }
);

export type VariantProps = CvaVariantProps<typeof classes>;
