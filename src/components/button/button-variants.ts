import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-all duration-200 focus:ring focus:ring-offset-0 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        outline: "border",
        tertiary: "border-none bg-transparent shadow-none",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-9 px-5 text-sm",
        lg: "h-10 px-5.5 text-sm",
        icon: "p-1.5",
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
      /* PRIMARY */
      {
        variant: "default",
        color: "primary",
        className:
          "bg-primary-1000 hover:bg-primary-950 focus:ring-primary-200 text-white",
      },
      {
        variant: "outline",
        color: "primary",
        className:
          "border-primary-1000 text-primary-1000 hover:bg-primary-50 focus:ring-primary-900",
      },
      {
        variant: "tertiary",
        color: "primary",
        className: "text-primary-1000 focus:ring-0",
      },

      /* SECONDARY */
      {
        variant: "default",
        color: "secondary",
        className: "text-primary-1000 bg-white",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-primary-1000 text-primary-1000 hover:bg-primary-50 focus:ring-primary-900",
      },
      {
        variant: "tertiary",
        color: "secondary",
        className: "text-gray-600 focus:ring-0",
      },

      /* SUCCESS */
      {
        variant: "default",
        color: "success",
        className:
          "bg-success-600 hover:bg-success-700 focus:ring-success-500 text-white",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "border-success-600 text-success-600 hover:bg-success-50 focus:ring-success-500",
      },
      {
        variant: "tertiary",
        color: "success",
        className: "text-success-600 focus:ring-0",
      },

      /* DANGER */
      {
        variant: "default",
        color: "danger",
        className:
          "bg-danger-500 hover:bg-danger-700 focus:ring-danger-500 text-white",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "border-danger-500 text-danger-600 hover:bg-danger-50 focus:ring-danger-500",
      },
      {
        variant: "tertiary",
        color: "danger",
        className: "text-danger-500 focus:ring-0",
      },

      /* WARNING */
      {
        variant: "default",
        color: "warning",
        className:
          "bg-warning-400 hover:bg-warning-500 focus:ring-warning-400 text-white",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "border-warning-400 text-warning-400 hover:bg-warning-50 focus:ring-warning-500",
      },
      {
        variant: "tertiary",
        color: "warning",
        className: "text-warning-600 focus:ring-0",
      },

      /* INFO */
      {
        variant: "default",
        color: "info",
        className:
          "bg-info-500 hover:bg-info-700 focus:ring-info-500 text-white",
      },
      {
        variant: "outline",
        color: "info",
        className:
          "border-info-500 text-info-500 hover:bg-info-50 focus:ring-info-500",
      },
      {
        variant: "tertiary",
        color: "info",
        className: "text-info-500 focus:ring-0",
      },

      /* ORANGE */
      {
        variant: "default",
        color: "orange",
        className:
          "bg-orange-500 text-white hover:bg-orange-700 focus:ring-orange-500",
      },
      {
        variant: "outline",
        color: "orange",
        className:
          "border-orange-500 text-orange-500 hover:bg-orange-50 focus:ring-orange-700",
      },
      {
        variant: "tertiary",
        color: "orange",
        className: "text-orange-600 focus:ring-0",
      },

      /* PURPLE */
      {
        variant: "default",
        color: "purple",
        className:
          "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
      },
      {
        variant: "outline",
        color: "purple",
        className:
          "border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500",
      },
      {
        variant: "tertiary",
        color: "purple",
        className: "text-purple-600 focus:ring-0",
      },

      /* GRAY */
      {
        variant: "default",
        color: "gray",
        className:
          "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-400",
      },
      {
        variant: "outline",
        color: "gray",
        className:
          "border-gray-700 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
      },
      {
        variant: "tertiary",
        color: "gray",
        className: "text-gray-700 focus:ring-0",
      },
    ],

    defaultVariants: {
      variant: "default",
      size: "md",
      color: "primary",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
