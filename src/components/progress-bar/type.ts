import type { BaseColor } from '../base';

export interface ProgressBarProps {
  value: number;
  useTooltip?: boolean;
  color?: BaseColor;
  className?: string;
  valueClassName?: string;
  tooltipSide?: 'top' | 'bottom';
}

export interface ProgressContentProps {
  value: number;
  classsName?: string;
  color?: BaseColor;
  useTooltip?: boolean;
  tooltipSide?: 'top' | 'bottom';
}
