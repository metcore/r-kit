import clsx from 'clsx';
import type { ProgressContentProps } from './type';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { Icon } from '../icons';
import { Text } from '../text';
import type { BaseColor } from '../base';

export default function ProgresssContent({
  classsName,
  value,
  color = 'primary',
  useTooltip = false,
  tooltipSide = 'top',
}: ProgressContentProps) {
  const color_map: Record<BaseColor, string> = {
    primary: 'bg-primary-1000',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    info: 'bg-info-500',
    success: 'bg-success-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    gray: 'bg-gray-600',
    secondary: 'bg-primary-100', // <-- ini blom ada di ui jadi gw set dulu biar gk kena error eslint, kal oada silahkan benerin
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={clsx(
            'h-full rounded-full duration-700 ease-in-out',
            color_map[color],
            classsName
          )}
          style={{
            width: `${value}%`,
          }}
        />
      </TooltipTrigger>
      {useTooltip && (
        <TooltipContent
          side={tooltipSide}
          align="end"
          className="relative translate-x-1/2"
        >
          <Text variant="t3" weight="medium" className="text-white">
            {value}%
          </Text>

          <Icon
            name="caret-down"
            className={clsx(
              'absolute text-gray-900',
              tooltipSide === 'top' && 'bottom-0 translate-y-2.5',
              tooltipSide === 'bottom' && 'top-0 -translate-y-2.5 rotate-180'
            )}
            size={18}
          />
        </TooltipContent>
      )}
    </Tooltip>
  );
}
