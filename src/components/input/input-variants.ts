import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "w-full min-w-0 rounded-lg border bg-transparent px-3 py-2 text-base font-medium text-gray-800 shadow-xs transition outline-none placeholder:text-gray-500",
  {
    variants: {
      size: {
        sm: "h-7 text-xs",
        md: "h-8 text-sm",
        lg: "h-10 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
