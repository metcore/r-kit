import clsx from 'clsx';
import { Text, type TextVariant } from '../../text';
import type { CalendarProps } from '../type';
import type { ReactNode } from 'react';

interface Props {
  wrapperClassName?: string;
  daysOfWeek: string[];
  size: CalendarProps['size'];
  variant?: CalendarProps['variant'];
  type?: CalendarProps['type'];
  renderItem?: (value: { day: string; label: string }) => ReactNode;
}

const day_of_week_size: Record<string, TextVariant> = {
  sm: 't2',
  md: 't2',
  lg: 't1',
};

export default function DaysOfWeek({
  daysOfWeek,
  size = 'md',
  wrapperClassName,
  variant = 'default',
  type = 'month',
  renderItem,
}: Props) {
  return (
    <div
      className={clsx(
        'grid justify-items-center',
        variant === 'compact' && 'calendar-cols mb-3 gap-x-1 *:text-center!',
        variant === 'default' && 'w-full bg-gray-100 *:p-3 *:w-full *:text-start! *:border-r *:border-gray-300 *:last:border-r-0', //prettier-ignore
        variant === 'default' && type === 'month' && 'grid-cols-7',
        variant === 'default' && type === 'week' && 'grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]', //prettier-ignore
        wrapperClassName
      )}
    >
      {type === 'week' && variant === 'default' && renderItem === undefined && (
        <>
          <div></div>
          {daysOfWeek.map((day) => (
            <Text as="h5" key={day} value={day} variant="t1" />
          ))}
        </>
      )}

      {type === 'month' &&
        renderItem === undefined &&
        daysOfWeek.map((day) => (
          <Text
            key={day}
            as="h5"
            weight={variant === 'compact' ? 'medium' : 'semibold'}
            value={day}
            className={clsx(
              variant === 'compact' && 'text-gray-600!',
              variant === 'default' && 'text-gray-900! uppercase'
            )}
            variant={variant === 'compact' ? day_of_week_size[size] : 't1'}
          />
        ))}
    </div>
  );
}
