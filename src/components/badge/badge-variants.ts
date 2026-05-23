import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex h-fit w-fit items-center justify-center gap-1',
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },

      variant: {
        default: '',
        dot: 'rounded-full p-0',
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
      {
        size: 'sm',
        variant: 'default',
        className: 'rounded px-1 py-0.5 text-[8px]',
      },

      {
        size: 'md',
        variant: 'default',
        className: 'rounded px-1 py-0.5 text-[10px]',
      },

      {
        size: 'lg',
        variant: 'default',
        className: 'rounded-lg px-2.5 py-1 text-sm',
      },

      {
        size: 'sm',
        variant: 'dot',
        className: 'size-1.5',
      },

      {
        size: 'md',
        variant: 'dot',
        className: 'size-2',
      },

      {
        size: 'lg',
        variant: 'dot',
        className: 'size-3',
      },

      {
        variant: 'default',
        color: 'primary',
        className: 'bg-primary-50 text-primary-1000',
      },

      {
        variant: 'default',
        color: 'secondary',
        className: 'text-primary-1000 bg-white',
      },

      {
        variant: 'default',
        color: 'success',
        className: 'bg-success-50 text-success-500',
      },

      {
        variant: 'default',
        color: 'danger',
        className: 'bg-danger-50 text-danger-500',
      },

      {
        variant: 'default',
        color: 'warning',
        className: 'bg-warning-50 text-warning-500',
      },

      {
        variant: 'default',
        color: 'info',
        className: 'bg-info-50 text-info-500',
      },

      {
        variant: 'default',
        color: 'orange',
        className: 'bg-orange-50 text-orange-500',
      },

      {
        variant: 'default',
        color: 'purple',
        className: 'bg-purple-50 text-purple-500',
      },

      {
        variant: 'default',
        color: 'gray',
        className: 'bg-gray-50 text-gray-700',
      },

      {
        variant: 'dot',
        color: 'primary',
        className: 'bg-primary-1000',
      },

      {
        variant: 'dot',
        color: 'secondary',
        className: 'bg-primary-1000',
      },

      {
        variant: 'dot',
        color: 'success',
        className: 'bg-success-500',
      },

      {
        variant: 'dot',
        color: 'danger',
        className: 'bg-danger-500',
      },

      {
        variant: 'dot',
        color: 'warning',
        className: 'bg-warning-500',
      },

      {
        variant: 'dot',
        color: 'info',
        className: 'bg-info-500',
      },

      {
        variant: 'dot',
        color: 'orange',
        className: 'bg-orange-500',
      },

      {
        variant: 'dot',
        color: 'purple',
        className: 'bg-purple-500',
      },

      {
        variant: 'dot',
        color: 'gray',
        className: 'bg-gray-700',
      },
    ],

    defaultVariants: {
      size: 'md',
      color: 'primary',
      variant: 'default',
    },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
