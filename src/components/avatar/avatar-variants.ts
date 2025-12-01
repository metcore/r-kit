import { cva } from "class-variance-authority";

export const AvatarVariants = cva(
  "flex justify-center items-center text-white",
  {
    variants: {
      variant: {
        circle: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-md",
      },
      size: {
        xs: "h-4.5 w-4.5 text-[10px] leading-2.5",
        sm: "h-6 w-6 text-[12px] leading-3",
        md: "h-8 w-8 text-[20px] leading-5",
        lg: "h-10 w-10 text-[20px] leading-5",
        xl: "h-17 w-17 text-[34px] leading-[34px]",
        xxl: "h-20 w-20 text-[40px] leading-10",
      },
      color: {
        primary: "bg-primary-1000",
        secondary: "bg-gray-400",
        success: "bg-success-500",
        danger: "bg-danger-500",
        warning: "bg-warning-400",
        info: "bg-info-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500",
        gray: "bg-gray-400",
      },
    },
    defaultVariants: {
      size: "md",
      color: "gray",
      variant: "circle",
    },
  }
);
