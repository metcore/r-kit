import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 h-fit w-fit justify-center",
  {
    variants: {
      size: {
        sm: "px-1 py-0.5 text-[8px] rounded",
        md: "px-1 py-0.5 text-[10px] rounded",
        lg: "px-2.5 py-1 text-sm rounded-lg",
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
        color: "primary",
        className: "bg-primary-50 text-primary-1000",
      },

      /* SECONDARY */
      {
        color: "secondary",
        className: "bg-white text-primary-1000",
      },

      /* SUCCESS */
      {
        color: "success",
        className: "bg-success-50 text-success-500",
      },

      /* DANGER */
      {
        color: "danger",
        className: "bg-danger-50 text-danger-500",
      },

      /* WARNING */
      {
        color: "warning",
        className: "bg-warning-50 text-warning-500",
      },

      /* INFO */
      {
        color: "info",
        className: "bg-info-50 text-info-500",
      },

      /* ORANGE */
      {
        color: "orange",
        className: "bg-orange-50 text-orange-500",
      },

      /* PURPLE */
      {
        color: "purple",
        className: "bg-purple-50 text-purple-500",
      },

      /* GRAY */
      {
        color: "gray",
        className: "bg-gray-50 text-gray-700",
      },
    ],

    defaultVariants: {
      size: "md",
      color: "primary",
    },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
