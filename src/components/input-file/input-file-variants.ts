import { cva } from "class-variance-authority";

export const inputFileVariants = cva("", {
  variants: {
    variant: {
      primary: "bg-primary-1000 *:*:text-white border-primary-1000 focus-within:outline-primary-900 hover:bg-primary-1000", //prettier-ignore
      secondary: "bg-transparent *:*:text-primary-1000 border-primary-1000 focus-within:outline-primary-900 hover:bg-primary-50", //prettier-ignore
      gray: "bg-gray-700 *:*:text-white border-gray-700 focus-within:outline-gray-700 hover:bg-gray-700", //prettier-ignore
      medium: "",
      large: "",
    },
  },
});
