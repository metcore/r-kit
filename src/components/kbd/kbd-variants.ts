import { cva } from "class-variance-authority";

export const kbdVariants = cva(
  "font-metropolis inline-flex items-center justify-center rounded-[4px] leading-none font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent",
        ghost: "border-0 bg-transparent",
      },

      color: {
        neutral: "",
        primary: "",
        success: "",
        danger: "",
        info: "",
        warning: "",
      },

      size: {
        sm: "px-1 py-0.5 text-[10px]",
        md: "px-1.5 py-0.5 text-xs",
        lg: "px-2 py-1 text-sm",
      },
    },

    compoundVariants: [
      // DEFAULT
      {
        variant: "default",
        color: "neutral",
        class: "border border-gray-200 bg-gray-50 text-gray-700!",
      },
      {
        variant: "default",
        color: "primary",
        class: "bg-primary-50 text-primary-1000 border-primary-200 border",
      },
      {
        variant: "default",
        color: "success",
        class: "bg-success-100 text-success-700 border-success-200 border",
      },
      {
        variant: "default",
        color: "danger",
        class: "bg-danger-100 text-danger-700 border-danger-200 border",
      },
      {
        variant: "default",
        color: "info",
        class: "bg-info-100 text-info-700 border-info-200 border",
      },
      {
        variant: "default",
        color: "warning",
        class: "bg-warning-100 text-warning-700 border-warning-200 border",
      },

      // OUTLINE
      {
        variant: "outline",
        color: "neutral",
        class: "border border-gray-300 text-gray-700",
      },
      {
        variant: "outline",
        color: "primary",
        class: "border-primary-500 text-primary-600 border",
      },
      {
        variant: "outline",
        color: "success",
        class: "border-success-500 text-success-600 border",
      },
      {
        variant: "outline",
        color: "danger",
        class: "border-danger-500 text-danger-600 border",
      },
      {
        variant: "outline",
        color: "info",
        class: "border-info-500 text-info-600 border",
      },
      {
        variant: "outline",
        color: "warning",
        class: "border-warning-500 text-warning-600 border",
      },

      // GHOST
      {
        variant: "ghost",
        color: "neutral",
        class: "text-gray-600",
      },
      {
        variant: "ghost",
        color: "primary",
        class: "text-primary-1000",
      },
      {
        variant: "ghost",
        color: "success",
        class: "text-success-600",
      },
      {
        variant: "ghost",
        color: "danger",
        class: "text-danger-600",
      },
      {
        variant: "ghost",
        color: "info",
        class: "text-info-600",
      },
      {
        variant: "ghost",
        color: "warning",
        class: "text-warning-600",
      },
    ],

    defaultVariants: {
      variant: "default",
      color: "neutral",
      size: "md",
    },
  },
);
