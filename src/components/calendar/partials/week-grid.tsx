import clsx from 'clsx';
import { Dropdown, DropdownContent, DropdownTrigger, useIsMobile } from '../../../clients'; //prettier-ignore
import { Icon } from '../../icons';
import { Text } from '../../text';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip';
import {
  formatHourLabel,
  getTimedEventLayouts,
  getWeekDays,
  getWeekEventSegments,
  isToday,
  isTimedEvent,
  packEventSegments,
} from '../helpers/helpers';
import type { CalendarDay, WeekGridProps } from '../type';
import ButtonMore from './button-more';
import EventBar from './event-bar';
import WeekEventBlock from './week-event-block';

const HOUR_HEIGHT = 80;
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function WeekGrid({
  weekStart,
  daysOfWeek,
  events = [],
  showCalendarTooltip = true,
  backdropOnClick,
  onEventClick,
  useLimitEvent = true,
  wrapperClassName,
}: WeekGridProps) {
  const isMobile = useIsMobile();
  const weekDays = getWeekDays(weekStart);

  const allDayEvents = events.filter((event) => !isTimedEvent(event));
  const timedEvents = events.filter(isTimedEvent);

  const segments = getWeekEventSegments({
    week: weekDays,
    events: allDayEvents,
  });
  const threshold = isMobile ? 1 : 2;
  const { renderSegments, columnHiddenSegments, columnMoreCount, allSegments } = //prettier-ignore
    packEventSegments({ segments, threshold });

  const timedLayouts = getTimedEventLayouts({ weekDays, events: timedEvents });
  const todayIndex = weekDays.findIndex((day) => isToday(day));
  const now = new Date();

  return (
    <div>
      {/* Header */}
      <div
        className={clsx(
          'grid grid-cols-[60px_repeat(7,minmax(0,1fr))]',
          wrapperClassName
        )}
      >
        <div className="border-r border-b border-gray-300 bg-white" />
        {weekDays.map((day, index) => {
          const today = isToday(day);
          return (
            <div
              key={index}
              className={clsx(
                'flex flex-col gap-2 border-r border-b border-gray-300 p-3 text-right last:border-r-0',
                today ? 'bg-gray-300' : 'bg-gray-100'
              )}
            >
              <Text
                as="h5"
                variant="t1"
                weight="semibold"
                className={clsx('uppercase', today ? 'text-info-500' : 'text-gray-900')} //prettier-ignore
              >
                {daysOfWeek[day.fullDate.getDay()]}
              </Text>
              <Text
                as="h5"
                variant="t1"
                weight="semibold"
                className={today ? 'text-info-500' : 'text-gray-900'}
              >
                {day.date}
              </Text>
            </div>
          );
        })}
      </div>

      {/* All Day row */}
      <div className="relative grid grid-cols-[60px_repeat(7,minmax(0,1fr))] border-b border-gray-300">
        <div
          className="flex items-center justify-end border-r border-gray-300 bg-white p-3"
          style={{ gridColumn: 1, gridRow: '1 / -1' }}
        >
          <Text variant="t2" weight="medium" className="text-gray-900">
            All Day
          </Text>
        </div>
        {weekDays.map((day, index) => (
          <div
            key={index}
            style={{ gridColumn: index + 2, gridRow: '1 / -1' }}
            className={clsx(
              'min-h-10.5 border-gray-300',
              index < 6 && 'border-r',
              isToday(day) ? 'bg-gray-50' : 'bg-white'
            )}
          />
        ))}
        {(useLimitEvent ? renderSegments : allSegments).map(
          ({ level, ...seg }, index) => (
            <EventBar
              key={index}
              segment={{ ...seg, startCol: seg.startCol + 1 }}
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
                  <div style={{ gridColumn: colIndex + 2 }}>
                    <ButtonMore count={count} />
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
                    {weekDays[colIndex] &&
                      new Intl.DateTimeFormat('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }).format(weekDays[colIndex].fullDate)}
                  </Text>
                  <div className="max-h-64 max-w-64 overflow-x-hidden overflow-y-auto">
                    {columnHiddenSegments[colIndex].map((seg, index) => (
                      <EventBar
                        key={index}
                        segment={{ ...seg, startCol: seg.startCol + 1 }}
                        level={0}
                        showTooltip={showCalendarTooltip}
                        onClick={() => onEventClick?.(seg.event)}
                      />
                    ))}
                  </div>
                </DropdownContent>
              </Dropdown>
            ) : null
          )}
      </div>

      {/* Hourly grid */}
      <div className="relative">
        <div
          className="grid grid-cols-[60px_repeat(7,minmax(0,1fr))]"
          style={{ gridTemplateRows: `repeat(24, ${HOUR_HEIGHT}px)` }}
        >
          {HOURS.map((hour) => (
            <div
              key={`label-${hour}`}
              style={{ gridColumn: 1, gridRow: hour + 1 }}
              className="flex items-start justify-end border-r border-b border-gray-300 bg-white p-3"
            >
              <Text variant="t2" weight="medium" className="text-gray-900">
                {formatHourLabel(hour)}
              </Text>
            </div>
          ))}
          {weekDays.map((day, dayIndex) =>
            HOURS.map((hour) => (
              <WeekHourCell
                key={`${dayIndex}-${hour}`}
                day={day}
                hour={hour}
                dayIndex={dayIndex}
                isToday={isToday(day)}
                onSlotClick={backdropOnClick}
              />
            ))
          )}
        </div>

        {/* Timed events */}
        <div
          className="pointer-events-none absolute top-0 right-0 left-15"
          style={{ height: 24 * HOUR_HEIGHT }}
        >
          {timedLayouts.map((layout, index) => (
            <WeekEventBlock
              key={index}
              layout={layout}
              hourHeight={HOUR_HEIGHT}
              showTooltip={showCalendarTooltip}
              onClick={() => onEventClick?.(layout.event)}
            />
          ))}
        </div>

        {/* Current time indicator */}
        {todayIndex !== -1 && (
          <div
            className="pointer-events-none absolute z-10 h-px bg-gray-900"
            style={{
              top:
                ((now.getHours() * 60 + now.getMinutes()) / 60) * HOUR_HEIGHT,
              left: `calc(60px + ${todayIndex} * (100% - 60px) / 7)`,
              width: `calc((100% - 60px) / 7)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

function WeekHourCell({
  day,
  hour,
  dayIndex,
  isToday: today,
  onSlotClick,
}: {
  day: CalendarDay;
  hour: number;
  dayIndex: number;
  isToday: boolean;
  onSlotClick?: (day?: CalendarDay) => void;
}) {
  const slotDate = new Date(day.fullDate);
  slotDate.setHours(hour, 0, 0, 0);

  return (
    <div
      style={{ gridColumn: dayIndex + 2, gridRow: hour + 1 }}
      className={clsx(
        'group relative border-b border-gray-300',
        dayIndex < 6 && 'border-r',
        today ? 'bg-gray-50' : 'bg-white'
      )}
    >
      {onSlotClick && (
        <>
          <button
            type="button"
            className="absolute inset-0 size-full cursor-pointer"
            onClick={() =>
              onSlotClick({
                date: slotDate.getDate(),
                month: 'current',
                fullDate: slotDate,
              })
            }
          />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Tooltip>
              <TooltipTrigger className="pointer-events-auto cursor-pointer">
                <Icon
                  name="plus"
                  className="text-gray-700! opacity-0 transition-opacity group-hover:opacity-100"
                  size={20}
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">Add Schedule</TooltipContent>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}
