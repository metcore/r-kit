import { cva } from "class-variance-authority";

export const TableVariants = cva("", {
  variants: {
    tableRow: {
      basic: "",
      bordered: "",
      stripped: "",
      hovered: "",
      "row-bordered": "border-y border-gray-300",
      "wrapped-row-bordered": "border-y border-gray-300",
      headed: "",
    },
  },
});
