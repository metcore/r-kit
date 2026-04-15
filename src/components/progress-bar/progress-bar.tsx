import clsx from 'clsx';
import ProgresssContent from './progress-content';
import type { ColorVariant, ProgressBarProps } from './type';

export default function ProgressBar({
  value,
  className,
  color = 'primary',
  useTooltip = false,
  valueClassName,
  tooltipSide = 'top',
}: ProgressBarProps) {
  const bg_color_map: Record<ColorVariant, string> = {
    primary: 'bg-primary-50',
    warning: 'bg-warning-50',
    danger: 'bg-danger-50',
    info: 'bg-info-50',
    success: 'bg-success-50',
    orange: 'bg-orange-50',
    purple: 'bg-purple-50',
    gray: 'bg-gray-50',
  };

  return (
    <div
      className={clsx(
        'h-2.5 w-full rounded-full',
        className,
        bg_color_map[color]
      )}
    >
      <ProgresssContent
        value={value}
        classsName={valueClassName}
        color={color}
        useTooltip={useTooltip}
        tooltipSide={tooltipSide}
      />
    </div>
  );
}
