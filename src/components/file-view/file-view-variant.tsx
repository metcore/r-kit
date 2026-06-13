import { cva, type VariantProps } from 'class-variance-authority';

export type FileViewVariant = 'large' | 'small';

export const fileViewVariants = cva('flex w-full border transition-colors', {
  variants: {
    variant: {
      large: 'flex-col overflow-hidden rounded-lg',
      small: 'items-center gap-2.5 rounded-lg',
    },
    color: {
      primary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
      gray: '',
      orange: '',
      purple: '',
      default: '',
    },
    interactive: {
      true: 'cursor-pointer',
      false: '',
    },
  },
  compoundVariants: [
    {
      color: 'default',
      className: 'border-gray-300 bg-white text-gray-800',
    },
    {
      color: 'primary',
      className: 'border-primary-300 text-primary-1000',
    },
    {
      color: 'info',
      className: 'bg-info-50 border-info-300 text-info-500',
    },
    {
      color: 'success',
      className: 'bg-success-50 border-success-300 text-success-500',
    },
    {
      color: 'warning',
      className: 'bg-warning-50 border-warning-300 text-warning-400',
    },
    {
      color: 'danger',
      className: 'bg-danger-50 border-danger-300 text-danger-500',
    },
    {
      color: 'gray',
      className: 'border-gray-300 bg-gray-50 text-gray-500',
    },
    {
      color: 'orange',
      className: 'border-orange-300 bg-orange-50 text-orange-500',
    },
    {
      color: 'purple',
      className: 'border-purple-300 bg-purple-50 text-purple-500',
    },
  ],
  defaultVariants: {
    variant: 'large',
    color: 'info',
    interactive: false,
  },
});

export const fileViewFooterVariants = cva('flex w-full gap-2 px-3 py-2', {
  variants: {
    color: {
      primary: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
      gray: '',
      orange: '',
      purple: '',
      default: '',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      className: 'bg-primary-50 text-primary-1000',
    },
    { color: 'info', className: 'bg-info-50 text-info-500' },
    {
      color: 'success',
      className: 'bg-success-50 text-success-500',
    },
    {
      color: 'warning',
      className: 'bg-warning-50 text-warning-400',
    },
    {
      color: 'danger',
      className: 'bg-danger-50 text-danger-500',
    },
    { color: 'gray', className: 'bg-gray-50 text-gray-800' },
    {
      color: 'orange',
      className: 'bg-orange-50 text-orange-500',
    },
    {
      color: 'purple',
      className: 'bg-purple-50 text-purple-500',
    },
  ],
  defaultVariants: {
    color: 'info',
  },
});

export type FileViewVariantProps = VariantProps<typeof fileViewVariants>;
