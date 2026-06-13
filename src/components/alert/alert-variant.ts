import { cva, type VariantProps } from 'class-variance-authority';

export const alertVariants = cva(
  'relative flex items-center gap-3 rounded-xl border px-4 py-2 text-sm',
  {
    variants: {
      variant: {
        solid: '',
        outline: '',
      },
      color: {
        info: '',
        success: '',
        warning: '',
        danger: '',
        gray: '',
        orange: '',
        purple: '',
        primary: '',
        secondary: '',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'info',
        className: 'bg-info-50 border-info-200 text-info-600',
      },
      {
        variant: 'solid',
        color: 'warning',
        className: 'bg-warning-50 border-warning-200 text-warning-600',
      },
      {
        variant: 'solid',
        color: 'success',
        className: 'bg-success-50 border-success-200 text-success-600',
      },
      {
        variant: 'solid',
        color: 'danger',
        className: 'bg-danger-50 border-danger-200 text-danger-600',
      },
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-primary-50 border-primary-200 text-primary-1000',
      },
      {
        variant: 'solid',
        color: 'purple',
        className: 'border-purple-200 bg-purple-50 text-purple-600',
      },
      {
        variant: 'solid',
        color: 'orange',
        className: 'border-orange-100 bg-orange-50 text-orange-600',
      },
      {
        variant: 'solid',
        color: 'gray',
        className: 'border-gray-700 bg-gray-900 text-white',
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: 'border-primary-1000 text-primary-1000 bg-white',
      },

      { variant: 'outline', color: 'info', className: 'border-info-200' },
      { variant: 'outline', color: 'success', className: 'border-success-200' },
      { variant: 'outline', color: 'warning', className: 'border-warning-200' },
      { variant: 'outline', color: 'danger', className: 'border-danger-200' },
      { variant: 'outline', color: 'gray', className: 'border-gray-900' },
      { variant: 'outline', color: 'orange', className: 'border-orange-200' },
      { variant: 'outline', color: 'purple', className: 'border-purple-200' },
      {
        variant: 'outline',
        color: 'primary',
        className: 'border-primary-1000',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'info',
      block: false,
    },
  }
);

export const alertIconVariants = cva(
  'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white',
  {
    variants: {
      variant: {
        solid: '',
        outline: '',
      },
      color: {
        info: '',
        success: '',
        warning: '',
        danger: '',
        gray: '',
        orange: '',
        purple: '',
        primary: '',
        secondary: '',
      },
    },
    compoundVariants: [
      {
        variant: ['solid', 'outline'],
        color: 'info',
        className: 'bg-info-500',
      },
      {
        variant: ['solid', 'outline'],
        color: 'success',
        className: 'bg-success-500',
      },
      {
        variant: ['solid', 'outline'],
        color: 'warning',
        className: 'bg-warning-500',
      },
      {
        variant: ['solid', 'outline'],
        color: 'danger',
        className: 'bg-danger-500',
      },
      {
        variant: ['solid', 'outline'],
        color: 'gray',
        className: 'bg-gray-500',
      },
      {
        variant: ['solid', 'outline'],
        color: 'orange',
        className: 'bg-orange-500',
      },
      {
        variant: ['solid', 'outline'],
        color: 'purple',
        className: 'bg-purple-500',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'info',
    },
  }
);

export const alertTitleVariants = cva('text-sm leading-5 font-semibold', {
  variants: {
    variant: {
      solid: '',
      outline: 'text-gray-900',
    },
    color: {
      info: '',
      success: '',
      warning: '',
      danger: '',
      gray: '',
      orange: '',
      purple: '',
      primary: '',
      secondary: '',
    },
  },
  compoundVariants: [
    {
      variant: ['solid', 'outline'],
      color: 'info',
      className: 'text-info-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'success',
      className: 'text-success-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'warning',
      className: 'text-warning-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'danger',
      className: 'text-danger-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'primary',
      className: 'text-primary-1000',
    },
    {
      variant: ['solid', 'outline'],
      color: 'orange',
      className: 'text-orange-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'purple',
      className: 'text-purple-800',
    },
    {
      variant: ['solid'],
      color: 'gray',
      className: 'text-white',
    },
    {
      variant: ['solid', 'outline'],
      color: 'secondary',
      className: 'text-primary-1000',
    },
    {
      variant: ['outline'],
      color: 'gray',
      className: 'text-gray-900',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'info',
  },
});

export const alertDescriptionVariants = cva('text-sm leading-5', {
  variants: {
    variant: {
      solid: '',
      outline: '',
    },
    color: {
      info: '',
      success: '',
      warning: '',
      danger: '',
      gray: '',
      orange: '',
      purple: '',
      primary: '',
      secondary: '',
    },
  },
  compoundVariants: [
    {
      variant: ['solid', 'outline'],
      color: 'info',
      className: 'text-info-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'success',
      className: 'text-success-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'warning',
      className: 'text-warning-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'danger',
      className: 'text-danger-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'primary',
      className: 'text-primary-1000',
    },
    {
      variant: ['solid', 'outline'],
      color: 'orange',
      className: 'text-orange-800',
    },
    {
      variant: ['solid', 'outline'],
      color: 'purple',
      className: 'text-purple-800',
    },
    {
      variant: ['solid'],
      color: 'gray',
      className: 'text-white',
    },
    {
      variant: ['solid', 'outline'],
      color: 'secondary',
      className: 'text-primary-1000',
    },
    {
      variant: ['outline'],
      color: 'gray',
      className: 'text-gray-900',
    },
  ],
  defaultVariants: {
    variant: 'solid',
  },
});

export type AlertVariantProps = VariantProps<typeof alertVariants>;
