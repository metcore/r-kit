import clsx from 'clsx';
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  useIsMobile,
} from '../../../clients';
import { Text } from '../../text';
import { getWeekEventSegments, packEventSegments } from '../helpers/helpers';
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
  backdropOnClick,
  onEventClick,
  useLimitEvent = true,
  disabledDateClassName,
}: CalendarGridProps) {
  const isMobile = useIsMobile();
  const weeks = Array.from({ length: Math.ceil(days.length / 7) }, (_, i) =>
    days.slice(i * 7, i * 7 + 7)
  );

  return (
    <div
      className={clsx(
        'relative',
        variant === 'compact' && size === 'sm' && 'space-y-1'
      )}
    >
      {weeks.map((week, weekIndex) => {
        const segments = getWeekEventSegments({ week, events });

        const threshold = isMobile ? 1 : 2;

        const { renderSegments, columnHiddenSegments, columnMoreCount, allSegments } = //prettier-ignore
          packEventSegments({ segments, threshold });

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
                variant === 'default' && '*:border-r *:border-gray-300 [&>*:nth-last-child(1)]:border-r-0', //prettier-ignore
                variant === 'compact' && 'place-items-center'
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
                  backdropOnClick={
                    variant === 'default' && backdropOnClick
                      ? (day) => backdropOnClick?.(day)
                      : undefined
                  }
                  disabledDateClassName={disabledDateClassName}
                />
              ))}
            </div>

            {/* Event bars */}
            {segments.length > 0 && (
              <div className="absolute inset-x-0 bottom-2 grid grid-cols-7 gap-0.5">
                {(useLimitEvent ? renderSegments : allSegments).map(
                  ({ level, ...seg }, index) => (
                    <EventBar
                      key={index}
                      segment={seg}
                      level={level}
                      showTooltip={showCalendarTooltip}
                      onClick={() => onEventClick?.(seg.event)}
                    />
                  )
                )}
                {useLimitEvent &&
                  columnMoreCount.map((count, colIndex) =>
                    count > 0 ? (
                      <Dropdown key={colIndex}>
                        <DropdownTrigger className="w-full" asChild>
                          <div style={{ gridColumnStart: colIndex + 1 }}>
                            <ButtonMore key={colIndex} count={count} />
                          </div>
                        </DropdownTrigger>
                        <DropdownContent
                          sideOffset={-130}
                          className="z-10 min-w-45 transform"
                        >
                          <Text
                            variant="t2"
                            weight="semibold"
                            className="text-gray-800"
                          >
                            {week[colIndex] &&
                              new Intl.DateTimeFormat('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }).format(week[colIndex].fullDate)}
                          </Text>
                          <div className="max-h-64 max-w-64 overflow-x-hidden overflow-y-auto">
                            {columnHiddenSegments[colIndex].map(
                              (seg, index) => (
                                <EventBar
                                  key={index}
                                  segment={seg}
                                  level={0}
                                  showTooltip={showCalendarTooltip}
                                  onClick={() => onEventClick?.(seg.event)}
                                />
                              )
                            )}
                          </div>
                        </DropdownContent>
                      </Dropdown>
                    ) : null
                  )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
