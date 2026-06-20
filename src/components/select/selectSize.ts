import { cva, type VariantProps } from 'class-variance-authority';

export const selectSize = cva('', {
  variants: {
    size: {
      sm: 'min-h-8 text-xs',
      md: 'min-h-9 text-sm',
      lg: 'min-h-10 text-base',
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export type SelectSize = VariantProps<typeof selectSize>['size'];
