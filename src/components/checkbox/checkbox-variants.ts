import { cva } from "class-variance-authority";

export const CheckboxVariants = cva(
  "flex items-center justify-center rounded border transition-all focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none",
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
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Checked state - background sesuai color
      {
        checked: true,
        color: "primary",
        class: "bg-primary-1000 border-primary-1000",
      },
      {
        checked: true,
        color: "secondary",
        class: "border-gray-600 bg-gray-600",
      },
      {
        checked: true,
        color: "success",
        class: "bg-success-500 border-success-500",
      },
      {
        checked: true,
        color: "danger",
        class: "bg-danger-500 border-danger-500",
      },
      {
        checked: true,
        color: "warning",
        class: "bg-warning-500 border-warning-500",
      },
      { checked: true, color: "info", class: "bg-info-500 border-info-500" },
      {
        checked: true,
        color: "orange",
        class: "border-orange-500 bg-orange-500",
      },
      {
        checked: true,
        color: "purple",
        class: "border-purple-500 bg-purple-500",
      },
      { checked: true, color: "gray", class: "border-gray-600 bg-gray-600" },

      // Unchecked state - background white
      { checked: false, class: "bg-white" },
    ],
    defaultVariants: {
      size: "md",
      color: "primary",
      checked: false,
    },
  },
);

export const CheckboxIndicatorVariants = cva("transition-all", {
  variants: {
    size: {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    },
    color: {
      primary: "text-white",
      secondary: "text-white",
      success: "text-white",
      danger: "text-white",
      warning: "text-white",
      info: "text-white",
      orange: "text-white",
      purple: "text-white",
      gray: "text-white",
    },
    icon: {
      check: "",
      minus: "",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
    icon: "check",
  },
});
