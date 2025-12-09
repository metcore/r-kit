import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  "flex flex-col rounded-xl border transition-colors",
  {
    variants: {
      variant: {
        filled: "",
        outline: "border bg-transparent",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        danger: "",
        warning: "",
        info: "",
        orange: "",
        purple: "",
        gray: "",
      },
    },

    compoundVariants: [
      /** FILLED VARIANTS */
      {
        variant: "filled",
        color: "primary",
        className: "bg-primary-1000 text-white",
      },
      {
        variant: "filled",
        color: "secondary",
        className: "bg-white text-gray-900",
      },
      {
        variant: "filled",
        color: "success",
        className: "bg-success-500 text-white",
      },
      {
        variant: "filled",
        color: "danger",
        className: "bg-danger-500 text-white",
      },
      {
        variant: "filled",
        color: "warning",
        className: "bg-warning-500 text-white",
      },
      {
        variant: "filled",
        color: "info",
        className: "bg-info-500 text-white",
      },
      {
        variant: "filled",
        color: "orange",
        className: "bg-orange-500 text-white",
      },
      {
        variant: "filled",
        color: "purple",
        className: "bg-purple-500 text-white",
      },
      {
        variant: "filled",
        color: "gray",
        className: "bg-gray-500 text-white",
      },

      /** OUTLINE VARIANTS */
      {
        variant: "outline",
        color: "primary",
        className: "border-primary-1000",
      },
      {
        variant: "outline",
        color: "secondary",
        className: "border-gray-200 bg-white",
      },
      {
        variant: "outline",
        color: "success",
        className: "border-success-500 bg-white",
      },
      {
        variant: "outline",
        color: "danger",
        className: "border-danger-500 bg-white",
      },
      {
        variant: "outline",
        color: "warning",
        className: "border-warning-500 bg-white",
      },
      {
        variant: "outline",
        color: "info",
        className: "border-info-500 bg-white",
      },
      {
        variant: "outline",
        color: "orange",
        className: "border-orange-500 bg-white",
      },
      {
        variant: "outline",
        color: "purple",
        className: "border-purple-500 bg-white",
      },
      {
        variant: "outline",
        color: "gray",
        className: "border-gray-700 bg-white",
      },
    ],

    defaultVariants: {
      size: "md",
      variant: "outline",
      color: "secondary",
    },
  },
);

export type CardVariantProps = VariantProps<typeof cardVariants>;

export const paddingBySize: Record<string, string> = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const dividerColors: Record<string, string> = {
  primary: "border-primary-1000",
  secondary: "border-gray-200",
  success: "border-success-500",
  danger: "border-danger-500",
  warning: "border-warning-500",
  info: "border-info-500",
  orange: "border-orange-500",
  purple: "border-purple-500",
  gray: "border-gray-700",
};
