import { cva } from 'class-variance-authority';

export const baseButtonVariants = cva('cursor-pointer', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer',
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
