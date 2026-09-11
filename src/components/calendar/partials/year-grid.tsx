import { getCalendarDays } from '../helpers/helpers';
import type { CalendarDay, YearGridProps } from '../type';
import { Text } from '../../text';
import { CalendarGrid } from './calendar-grid';

export function YearGrid({
  currentYear,
  months,
  daysOfWeek,
  helpers,
  size,
  mode,
  styleConfig,
  onClick,
  disabledDateClassName,
}: YearGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
      {months.map((monthLabel, monthIndex) => (
        <div
          key={monthIndex}
          className="rounded-2xl border border-gray-200 px-3 py-4"
        >
          <Text
            as="h4"
            variant="p2"
            weight="semibold"
            className="mb-3 text-gray-900"
          >
            {monthLabel}
          </Text>

          <div className="mb-2 grid grid-cols-7 justify-items-center">
            {daysOfWeek.map((day) => (
              <Text
                key={day}
                as="h5"
                value={day}
                variant="t3"
                weight="medium"
                className="text-gray-600!"
              />
            ))}
          </div>

          <CalendarGrid
            days={getCalendarDays({ currentMonth: monthIndex, currentYear }) as CalendarDay[]} //prettier-ignore
            helpers={helpers}
            size={size}
            mode={mode}
            styleConfig={styleConfig}
            onClick={onClick}
            variant="compact"
            disabledDateClassName={disabledDateClassName}
          />
        </div>
      ))}
    </div>
  );
}
