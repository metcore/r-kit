import { cva } from "class-variance-authority";

export const TextVariants = cva("font-metropolis", {
  variants: {
    variant: {
      h1: "text-[36px] leading-[46px]",
      h2: "text-[32px] leading-[42px]",
      h3: "text-[28px] leading-[38px]",
      h4: "text-[24px] leading-[34px]",

      p1: "text-[20px] leading-[30px]",
      p2: "text-[18px] leading-[28px]",
      p3: "text-[16px] leading-[26px]",

      t1: "text-[14px] leading-[24px]",
      t2: "text-[12px] leading-[20px]",
      t3: "text-[10px] leading-[14px]",
      t4: "text-[8px] leading-[10px]",
    },

    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },

    color: {
      default: "text-gray-900",
      muted: "text-gray-400",
      primary: "text-primary-500",
      success: "text-success-500",
      warning: "text-warning-500",
      orange: "text-orange-500",
      danger: "text-danger-500",
      info: "text-info-500",
      purple: "text-purple-500",
      gray: "text-gray-500",
    },

    align: {
      start: "text-left",
      center: "text-center",
      end: "text-right",
      justify: "text-justify",
    },

    numberOfLines: {
      1: "line-clamp-1",
      2: "line-clamp-2",
      3: "line-clamp-3",
      4: "line-clamp-4",
    },
  },

  defaultVariants: {
    variant: "t2",
    weight: "regular",
    color: "default",
    align: "start",
  },
});
