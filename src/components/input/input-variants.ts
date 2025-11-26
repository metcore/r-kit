import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "text-gray-800 font-medium placeholder:text-gray-500 border w-full min-w-0 rounded-lg bg-transparent px-3 py-2 text-base shadow-xs transition outline-none",
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
  }
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
