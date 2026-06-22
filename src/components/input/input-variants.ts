import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva('', {
  variants: {
    size: {
      sm: 'h-8 text-xs',
      md: 'h-9 text-sm',
      lg: 'h-10 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
