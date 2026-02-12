import { cva } from "class-variance-authority";

export const counterVariants = cva("", {
  variants: {
    size: {
      sm: "px-0 text-xs",
      md: "text-md",
      lg: "text-lg",
    },
    controlIconSize: {
      sm: "size-[10px]",
      md: "size-[14px]",
      lg: "size-[16px]",
    },
    height: {
      sm: "h-[22px]",
      md: "h-[30px]",
      lg: "h-[40px]",
    },

    variant: {
      primary: "border-0",
      secondary: "border border-gray-500",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
