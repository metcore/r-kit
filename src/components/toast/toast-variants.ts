import { cva } from 'class-variance-authority';

export const ToastVariants = cva('', {
  variants: {
    bg: {
      danger: 'bg-danger-50',
      gray: 'bg-gray-400',
      info: 'bg-info-50',
      orange: 'bg-orange-50',
      primary: 'bg-primary-1000',
      success: 'bg-success-50',
      purple: 'bg-purple-50',
      secondary: 'bg-white',
      warning: 'bg-warning-50',
    },
    text: {
      danger: 'text-danger-500',
      gray: 'text-gray-700',
      info: 'text-info-500',
      orange: 'text-orange-500',
      primary: 'text-white',
      success: 'text-success-500',
      purple: 'text-purple-500',
      secondary: 'text-primary-1000',
      warning: 'text-warning-500',
    },
  },
});
