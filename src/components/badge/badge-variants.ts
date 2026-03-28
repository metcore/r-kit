import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'h-fit w-fit items-center justify-center gap-1',
  {
    variants: {
      size: {
        sm: `rounded px-1 py-0.5 text-[8px]`,
        md: `rounded px-1 py-0.5 text-[10px]`,
        lg: `rounded-lg px-2.5 py-1 text-sm`,
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        danger: '',
        warning: '',
        info: '',
        orange: '',
        purple: '',
        gray: '',
      },
    },

    compoundVariants: [
      /* PRIMARY */
      {
        color: 'primary',
        className: 'bg-primary-50 text-primary-1000',
      },

      /* SECONDARY */
      {
        color: 'secondary',
        className: 'text-primary-1000 bg-white',
      },

      /* SUCCESS */
      {
        color: 'success',
        className: 'bg-success-50 text-success-500',
      },

      /* DANGER */
      {
        color: 'danger',
        className: 'bg-danger-50 text-danger-500',
      },

      /* WARNING */
      {
        color: 'warning',
        className: 'bg-warning-50 text-warning-500',
      },

      /* INFO */
      {
        color: 'info',
        className: 'bg-info-50 text-info-500',
      },

      /* ORANGE */
      {
        color: 'orange',
        className: 'bg-orange-50 text-orange-500',
      },

      /* PURPLE */
      {
        color: 'purple',
        className: 'bg-purple-50 text-purple-500',
      },

      /* GRAY */
      {
        color: 'gray',
        className: 'bg-gray-50 text-gray-700',
      },
    ],

    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
