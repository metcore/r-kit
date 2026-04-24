import type { ReactNode } from 'react';
import type { BadgeVariantProps } from '../badge';

export type TimeLineColor =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'orange'
  | 'info'
  | 'purple'
  | 'gray';

export interface TimeLineProps {
  className?: string;

  value?: {
    label?: string;
    title: string;
    subtitle?: string;
    description?: string;
    advanced?: () => ReactNode;
  };

  classNames?: {
    labelWrapperClassName?: string;
    labelClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    descriptionClassName?: string;
  };

  badge?: {
    value?: string;
    color?: BadgeVariantProps['color'];
    size?: BadgeVariantProps['size'];
  };

  color?: TimeLineColor;
  children?: React.ReactNode;
}
