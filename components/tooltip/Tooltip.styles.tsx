import { cva, VariantProps as CvaVariantProps } from "class-variance-authority";

export const tooltipClasses = cva(
  [
    "absolute invisible group-hover:visible bg-background text-white text-center rounded-lg px-4 py-2 z-10",
  ],
  {
    variants: {
      position: {
        right:
          "right-0 translate-x-full translate-y-[-50%] mt-0 mr-[-0.5rem] top-2/4",
        left: "left-0 translate-x-[-100%] translate-y-[-50%] mt-0 ml-[-0.5rem] top-2/4",
        bottom: "left-2/4 translate-x-[-50%] mt-2",
        top: "top-0 left-2/4 translate-x-[-50%] translate-y-[-100%] mt-[-0.5rem]",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

export const arrowClasses = cva(
  ["absolute content-none border-[5px] border-solid border-transparent"],
  {
    variants: {
      position: {
        right: "right-full bottom-2/4 mb-[-5px] mr-[-1px] border-r-background",
        left: "left-full bottom-2/4 mb-[-5px] ml-[-1px] border-l-background",
        bottom: "bottom-full left-2/4 ml-[-5px] !border-b-background",
        top: "top-full left-2/4 ml-[-5px] border-t-background",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  }
);

export type VariantProps = CvaVariantProps<typeof tooltipClasses>;
