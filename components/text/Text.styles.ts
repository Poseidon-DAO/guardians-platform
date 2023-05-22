import { cva, VariantProps as CvaVariantProps } from "class-variance-authority";

export const classes = cva("text-inherit", {
  variants: {
    intent: {
      text: ["text-base"],
      h1: ["text-6xl"],
      h2: ["text-5xl"],
      h3: ["text-4xl"],
      h4: ["text-3xl"],
      h5: ["text-2xl"],
      h6: ["text-1xl"],
    },
    size: {
      small: ["text-sm"],
      base: ["text-base"],
      large: ["text-lg"],
      xl: ["text-1xl"],
      "2xl": ["text-2xl"],
      "3xl": ["text-3xl"],
      "4xl": ["text-4xl"],
      "5xl": ["text-5xl"],
      "6x": ["text-6xl"],
      "7xl": ["text-7xl"],
      "8xl": ["text-8xl"],
      "9xl": ["text-9xl"],
    },
    textColor: {
      white: "text-text",
      blue: "text-blue",
      red: "text-red",
      purple: "text-purple",
      indigo: "text-background",
      black: "text-black",
    },
  },
  defaultVariants: {
    intent: "text",
    textColor: "indigo",
  },
});

export type VariantProps = CvaVariantProps<typeof classes>;
