import clsx from 'clsx';
import { Text, type TextVariant } from '../../text';
import type { CalendarProps } from '../type';

interface Props {
  wrapperClassName?: string;
  daysOfWeek: string[];
  size: CalendarProps['size'];
  variant?: CalendarProps['variant'];
}

const day_of_week_size: Record<string, TextVariant> = {
  sm: 't3',
  md: 't2',
  lg: 't1',
};

export default function DaysOfWeek({
  daysOfWeek,
  size = 'md',
  wrapperClassName,
  variant = 'default',
}: Props) {
  return (
    <div
      className={clsx(
        'grid justify-items-center',
        variant === 'compact' && 'calendar-cols mb-3 gap-x-1 *:text-center!',
        variant === 'default' && 'w-full grid-cols-7 bg-gray-100 *:p-3 *:w-full *:text-start! *:border-r *:border-gray-300 *:last:border-r-0', //prettier-ignore
        wrapperClassName
      )}
    >
      {daysOfWeek.map((day) => (
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
