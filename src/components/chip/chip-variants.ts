import { cva, type VariantProps } from "class-variance-authority";

export const chipVariants = cva(
  "rounded-lg border transition-all duration-200 inline-flex items-center justify-center cursor-pointer",
  {
    variants: {
      size: {
        sm: "p-1.5 text-xs",
        md: "p-2 text-sm",
        lg: "px-3 py-2 text-base",
      },
      color: {
        primary: "",
        success: "",
        danger: "",
        warning: "",
        info: "",
        purple: "",
        orange: "",
        gray: "",
      },
      state: {
        default: "",
        selected: "",
        disabled: "",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      // Default color variants
      {
        color: "gray",
        state: "default",
        className: "bg-white border-gray-00 text-gray-700 hover:bg-gray-100",
      },
      {
        color: "gray",
        state: "selected",
        className: "bg-gray-200 border-gray-400 text-gray-800",
      },
      {
        color: "gray",
        state: "disabled",
        className:
          "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed",
      },
      // Primary color variants
      {
        color: "primary",
        state: "default",
        className:
          "bg-white border-primary-200 text-primary-1000 hover:bg-primary-50",
      },
      {
        color: "primary",
        state: "selected",
        className: "bg-primary-50 border-primary-200 text-primary-1000",
      },
      {
        color: "primary",
        state: "disabled",
        className:
          "bg-primary-100 border-primary-200 text-primary-300 cursor-not-allowed",
      },
      // Success color variants
      {
        color: "success",
        state: "default",
        className:
          "bg-white border-success-300 text-success-500 hover:bg-success-50",
      },
      {
        color: "success",
        state: "selected",
        className: "bg-success-100 border-success-200 text-success-500",
      },
      {
        color: "success",
        state: "disabled",
        className:
          "bg-success-100 border-success-200 text-success-300 cursor-not-allowed",
      },
      // Danger color variants
      {
        color: "danger",
        state: "default",
        className:
          "bg-white border-danger-200 text-danger-500 hover:bg-danger-50",
      },
      {
        color: "danger",
        state: "selected",
        className: "bg-danger-100 border-danger-200 text-danger-500",
      },
      {
        color: "danger",
        state: "disabled",
        className:
          "bg-danger-100 border-danger-200 text-danger-300 cursor-not-allowed",
      },
      // Warning color variants
      {
        color: "warning",
        state: "default",
        className:
          "bg-white border-warning-300 text-warning-400 hover:bg-warning-50",
      },
      {
        color: "warning",
        state: "selected",
        className: "bg-warning-100 border-warning-300 text-warning-500",
      },
      {
        color: "warning",
        state: "disabled",
        className:
          "bg-warning-100 border-warning-200 text-warning-300 cursor-not-allowed",
      },
      // Info color variants
      {
        color: "info",
        state: "default",
        className: "bg-white border-info-200 text-info-500 hover:bg-info-50",
      },
      {
        color: "info",
        state: "selected",
        className: "bg-info-100 border-info-200 text-info-500",
      },
      {
        color: "info",
        state: "disabled",
        className:
          "bg-info-100 border-info-200 text-info-300 cursor-not-allowed",
      },
      // Purple color variants
      {
        color: "purple",
        state: "default",
        className:
          "bg-white border-purple-200 text-purple-500 hover:bg-purple-50",
      },
      {
        color: "purple",
        state: "selected",
        className: "bg-purple-100 border-purple-200 text-purple-500",
      },
      {
        color: "purple",
        state: "disabled",
        className:
          "bg-purple-100 border-purple-200 text-purple-300 cursor-not-allowed",
      },
      // Orange color variants
      {
        color: "orange",
        state: "default",
        className:
          "bg-white border-orange-200 text-orange-500 hover:bg-orange-50",
      },
      {
        color: "orange",
        state: "selected",
        className: "bg-orange-100 border-orange-200 text-orange-500",
      },
      {
        color: "orange",
        state: "disabled",
        className:
          "bg-orange-100 border-orange-200 text-orange-300 cursor-not-allowed",
      },
    ],
    defaultVariants: {
      size: "md",
      color: "primary",
      state: "default",
      block: false,
    },
  }
);

export type ChipVariants = VariantProps<typeof chipVariants>;
