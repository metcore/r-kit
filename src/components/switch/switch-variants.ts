import { cva } from "class-variance-authority";

export const SwitchVariants = cva(
  "relative inline-flex shrink-0 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      color: {
        primary:
          "data-[state=checked]:bg-primary-1000 focus-visible:ring-primary-900",
        secondary:
          "focus-visible:ring-gray-500 data-[state=checked]:bg-gray-600",
        success:
          "data-[state=checked]:bg-success-500 focus-visible:ring-success-400",
        danger:
          "data-[state=checked]:bg-danger-500 focus-visible:ring-danger-400",
        warning:
          "data-[state=checked]:bg-warning-500 focus-visible:ring-warning-400",
        info: "data-[state=checked]:bg-info-500 focus-visible:ring-info-400",
        orange:
          "focus-visible:ring-orange-400 data-[state=checked]:bg-orange-500",
        purple:
          "focus-visible:ring-purple-400 data-[state=checked]:bg-purple-500",
        gray: "focus-visible:ring-gray-600 data-[state=checked]:bg-gray-700",
      },
    },
    defaultVariants: {
      size: "md",
      color: "primary",
    },
  },
);

export const SwitchThumbVariants = cva(
  "pointer-events-none absolute top-0.5 inline-block rounded-full bg-white shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4.5 data-[state=unchecked]:translate-x-0.5",
        md: "h-5 w-5 data-[state=checked]:translate-x-5.5 data-[state=unchecked]:translate-x-0.5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7.5 data-[state=unchecked]:translate-x-0.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
