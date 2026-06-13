import { cva } from 'class-variance-authority';

export const baseButtonVariants = cva('', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
    loading: {
      true: 'cursor-wait',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
    loading: false,
  },
});
