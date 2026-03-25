import { cva, type VariantProps } from 'class-variance-authority';

export const chipVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-lg border transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'p-1.5 text-xs',
        md: 'p-2 text-sm',
        lg: 'px-3 py-2 text-base',
      },
      color: {
        primary: '',
        success: '',
        danger: '',
        warning: '',
        info: '',
        purple: '',
        orange: '',
        gray: '',
      },
      state: {
        default: '',
        selected: '',
        disabled: '',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      // Default color variants
      {
        color: 'gray',
        state: 'default',
        className: 'border-gray-00 bg-white text-gray-700 hover:bg-gray-100',
      },
      {
        color: 'gray',
        state: 'selected',
        className: 'border-gray-400 bg-gray-200 text-gray-800',
      },
      {
        color: 'gray',
        state: 'disabled',
        className:
          'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400',
      },
      // Primary color variants
      {
        color: 'primary',
        state: 'default',
        className:
          'border-primary-200 text-primary-1000 hover:bg-primary-50 bg-white',
      },
      {
        color: 'primary',
        state: 'selected',
        className: 'bg-primary-50 border-primary-200 text-primary-1000',
      },
      {
        color: 'primary',
        state: 'disabled',
        className:
          'bg-primary-100 border-primary-200 text-primary-300 cursor-not-allowed',
      },
      // Success color variants
      {
        color: 'success',
        state: 'default',
        className:
          'border-success-300 text-success-500 hover:bg-success-50 bg-white',
      },
      {
        color: 'success',
        state: 'selected',
        className: 'bg-success-100 border-success-200 text-success-500',
      },
      {
        color: 'success',
        state: 'disabled',
        className:
          'bg-success-100 border-success-200 text-success-300 cursor-not-allowed',
      },
      // Danger color variants
      {
        color: 'danger',
        state: 'default',
        className:
          'border-danger-200 text-danger-500 hover:bg-danger-50 bg-white',
      },
      {
        color: 'danger',
        state: 'selected',
        className: 'bg-danger-100 border-danger-200 text-danger-500',
      },
      {
        color: 'danger',
        state: 'disabled',
        className:
          'bg-danger-100 border-danger-200 text-danger-300 cursor-not-allowed',
      },
      // Warning color variants
      {
        color: 'warning',
        state: 'default',
        className:
          'border-warning-300 text-warning-400 hover:bg-warning-50 bg-white',
      },
      {
        color: 'warning',
        state: 'selected',
        className: 'bg-warning-100 border-warning-300 text-warning-500',
      },
      {
        color: 'warning',
        state: 'disabled',
        className:
          'bg-warning-100 border-warning-200 text-warning-300 cursor-not-allowed',
      },
      // Info color variants
      {
        color: 'info',
        state: 'default',
        className: 'border-info-200 text-info-500 hover:bg-info-50 bg-white',
      },
      {
        color: 'info',
        state: 'selected',
        className: 'bg-info-100 border-info-200 text-info-500',
      },
      {
        color: 'info',
        state: 'disabled',
        className:
          'bg-info-100 border-info-200 text-info-300 cursor-not-allowed',
      },
      // Purple color variants
      {
        color: 'purple',
        state: 'default',
        className:
          'border-purple-200 bg-white text-purple-500 hover:bg-purple-50',
      },
      {
        color: 'purple',
        state: 'selected',
        className: 'border-purple-200 bg-purple-100 text-purple-500',
      },
      {
        color: 'purple',
        state: 'disabled',
        className:
          'cursor-not-allowed border-purple-200 bg-purple-100 text-purple-300',
      },
      // Orange color variants
      {
        color: 'orange',
        state: 'default',
        className:
          'border-orange-200 bg-white text-orange-500 hover:bg-orange-50',
      },
      {
        color: 'orange',
        state: 'selected',
        className: 'border-orange-200 bg-orange-100 text-orange-500',
      },
      {
        color: 'orange',
        state: 'disabled',
        className:
          'cursor-not-allowed border-orange-200 bg-orange-100 text-orange-300',
      },
    ],
    defaultVariants: {
      size: 'md',
      color: 'primary',
      state: 'default',
      block: false,
    },
  }
);

export type ChipVariants = VariantProps<typeof chipVariants>;
