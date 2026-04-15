export type ColorVariant =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'purple'
  | 'orange'
  | 'gray';

export interface ProgressBarProps {
  value: number;
  useTooltip?: boolean;
  color?: ColorVariant;
  className?: string;
  valueClassName?: string;
  tooltipSide?: 'top' | 'bottom';
}

export interface ProgressContentProps {
  value: number;
  classsName?: string;
  color?: ColorVariant;
  useTooltip?: boolean;
  tooltipSide?: 'top' | 'bottom';
}
