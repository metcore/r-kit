import { cn } from '../../lib/utils';
import { colorMap, positionMap, sizeMap } from './indicator-variants';
import type { ColorVariant } from './type';

type IndicatorPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

interface Props {
  color: ColorVariant;
  size?: 'sm' | 'md' | 'lg';
  value?: number | string;
  position?: IndicatorPosition;
  pulse?: boolean;
  children: React.ReactNode;
  indicatorClassName?: string;
}

export function Indicator({
  color,
  size = 'md',
  value,
  position = 'top-right',
  pulse = false,
  children,
  indicatorClassName,
}: Props) {
  const isDot = value === undefined;

  return (
    <div className="relative inline-block">
      {children}

      <span
        className={cn(
          'absolute z-10 flex items-center justify-center rounded-sm font-medium',
          indicatorClassName,
          sizeMap[size],
          positionMap[position],
          colorMap[color].bg,
          colorMap[color].text,
          pulse && 'animate-pulse',
          isDot && 'h-2 w-2 min-w-0 p-0'
        )}
      >
        {!isDot && value}
      </span>
    </div>
  );
}
