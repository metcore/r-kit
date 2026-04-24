import clsx from 'clsx';
import type { TimeLineColor, TimeLineProps } from './types';
import { Text } from '../text';
import { Badge } from '../badge';
import { Icon } from '../icons';

export function Timeline({
  badge,
  children,
  color = 'primary',
  value,
  classNames,
  className,
}: TimeLineProps) {
  const mapped_text_color: Record<TimeLineColor, string> = {
    primary: 'text-primary-1000',
    success: 'text-success-500',
    danger: 'text-danger-500',
    warning: 'text-warning-500',
    orange: 'text-orange-500',
    info: 'text-info-500',
    gray: 'text-gray-500',
    purple: 'text-purple-500',
  };

  return (
    <div
      className={clsx(
        'relative w-80 border-l border-dashed border-gray-500 px-4.5',
        className
      )}
    >
      <Icon
        name="target-elipse"
        className={clsx(
          'absolute top-0 left-0 z-10 -translate-x-1/2 -translate-y-1/2',
          mapped_text_color[color]
        )}
      />

      {children !== undefined && children}

      {children === undefined && (
        <div className="flex flex-col pb-2">
          <div
            className={clsx(
              '-mt-2.5 flex items-center justify-between',
              classNames?.labelWrapperClassName
            )}
          >
            {value?.label !== undefined && (
              <Text variant="t2" weight="medium" className="text-gray-600">
                {value?.label}
              </Text>
            )}

            {badge !== undefined && (
              <Badge size={badge?.size ?? 'sm'} color={badge?.color ?? color}>
                {badge?.value}
              </Badge>
            )}
          </div>

          <Text
            variant="t2"
            weight="semibold"
            className={clsx('text-gray-900', classNames?.titleClassName)}
          >
            {value?.title ?? '-'}
          </Text>

          {value?.subtitle !== undefined && (
            <Text
              variant="t2"
              weight="medium"
              className={clsx('text-gray-700', classNames?.subtitleClassName)}
            >
              {value?.subtitle}
            </Text>
          )}

          {value?.description !== undefined && (
            <Text
              variant="t2"
              className={clsx(
                'mt-1 text-gray-700',
                classNames?.descriptionClassName
              )}
            >
              {value?.description}
            </Text>
          )}
          {value?.advanced !== undefined && value?.advanced?.()}
        </div>
      )}
    </div>
  );
}
