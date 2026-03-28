import clsx from 'clsx';
import { useIsMobile } from '../../../clients';
import { getWeekEventSegments } from '../helpers/helpers';
import type { CalendarGridProps } from '../type';
import ButtonMore from './button-more';
import CalendarDayItem from './calendar-day-item';
import EventBar from './event-bar';

export function CalendarGrid({
  days,
  helpers,
  size,
  mode,
  styleConfig,
  onClick,
  className,
  variant,
  events = [],
  showCalendarTooltip = true,
}: CalendarGridProps) {
  const isMobile = useIsMobile();
  const weeks = Array.from({ length: Math.ceil(days.length / 7) }, (_, i) =>
    days.slice(i * 7, i * 7 + 7)
  );

  return (
    <div className="relative">
      {weeks.map((week, weekIndex) => {
        const segments = getWeekEventSegments({
          week,
          events,
        });

        const columnEventCount = Array(7).fill(0);

        segments.forEach((seg) => {
          for (let i = 0; i < seg.span; i++) {
            const colIndex = seg.startCol + i;

            if (colIndex >= 0 && colIndex < 7) {
              columnEventCount[colIndex]++;
            }
          }
        });

        return (
          <div
            key={weekIndex}
            className={clsx(
              'relative',
              variant === 'default' && 'border-b border-gray-300 last:border-b-0!', //prettier-ignore
              className
            )}
          >
            {/* Day cells */}
            <div
              className={clsx(
                'grid w-full grid-cols-7',
                variant === 'default' && '*:border-r *:border-gray-300 [&>*:nth-last-child(1)]:border-r-0' //prettier-ignore
              )}
            >
              {week.map((day, dayIndex) => (
                <CalendarDayItem
                  key={dayIndex}
                  day={day}
                  helpers={helpers}
                  size={size}
                  mode={mode}
                  styleConfig={styleConfig}
                  onClick={onClick}
                  variant={variant}
                  events={events}
                />
              ))}
            </div>

            {/* Event bars */}
            {segments.length > 0 && (
              <div className="absolute inset-x-0 bottom-2 grid grid-cols-7 gap-0.5">
                {segments.slice(0, isMobile ? 1 : 2).map((seg, index) => (
                  <EventBar
                    key={index}
                    segment={seg}
                    showTooltip={showCalendarTooltip}
                  />
                ))}

                <ButtonMore segments={segments} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
