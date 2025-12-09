import { cva } from "class-variance-authority";

export const RadioVariants = cva(
  "flex items-center justify-center rounded-full border transition-all focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      color: {
        primary: "border-primary-1000 focus-visible:ring-primary-900",
        secondary: "border-gray-600 focus-visible:ring-gray-500",
        success: "border-success-500 focus-visible:ring-success-400",
        danger: "border-danger-500 focus-visible:ring-danger-400",
        warning: "border-warning-500 focus-visible:ring-warning-400",
        info: "border-info-500 focus-visible:ring-info-400",
        orange: "border-orange-500 focus-visible:ring-orange-400",
        purple: "border-purple-500 focus-visible:ring-purple-400",
        gray: "border-gray-600 focus-visible:ring-gray-500",
      },
    },
    defaultVariants: {
      size: "md",
      color: "primary",
    },
  },
);

export const RadioIndicatorVariants = cva("rounded-full transition-all", {
  variants: {
    size: {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
    },
    color: {
      primary: "bg-primary-1000",
      secondary: "bg-gray-600",
      success: "bg-success-500",
      danger: "bg-danger-500",
      warning: "bg-warning-500",
      info: "bg-info-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      gray: "bg-gray-600",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});
