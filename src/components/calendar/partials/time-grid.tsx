import clsx from 'clsx';
import { Dropdown, DropdownContent, DropdownTrigger, useIsMobile } from '../../../clients'; //prettier-ignore
import { Icon } from '../../icons';
import { Text } from '../../text';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip';
import {
  formatHourLabel,
  getWeekEventSegments,
  groupTimedEventsByHour,
  isToday,
  isTimedEvent,
  packEventSegments,
} from '../helpers/helpers';
import type { CalendarDay, CalendarEvent, TimeGridProps } from '../type';
import ButtonMore from './button-more';
import EventBar from './event-bar';
import TimedEventBlock from './timed-event-block';

const HOUR_HEIGHT = 80;
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MAX_VISIBLE_TIMED_EVENTS = 2;

export function TimeGrid({
  days,
  daysOfWeek,
  events = [],
  showCalendarTooltip = true,
  backdropOnClick,
  onEventClick,
  useLimitEvent = true,
  wrapperClassName,
}: TimeGridProps) {
  const isMobile = useIsMobile();
  const dayCount = days.length;
  const gridTemplateColumns = `60px repeat(${dayCount}, minmax(0,1fr))`;

  const allDayEvents = events.filter((event) => !isTimedEvent(event));
  const timedEvents = events.filter(isTimedEvent);

  const segments = getWeekEventSegments({ week: days, events: allDayEvents });
  const threshold = isMobile ? 1 : 2;
  const { renderSegments, columnHiddenSegments, columnMoreCount, allSegments } = //prettier-ignore
    packEventSegments({ segments, threshold, columns: dayCount });

  const hourlyGroups = groupTimedEventsByHour({ days, events: timedEvents });

  return (
    <div>
      {/* Header */}
      <div
        className={clsx('grid', wrapperClassName)}
        style={{ gridTemplateColumns }}
      >
        <div className="border-r border-b border-gray-300 bg-white" />
        {days.map((day, index) => {
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
      <div
        className="relative grid border-b border-gray-300"
        style={{ gridTemplateColumns }}
      >
        <div
          className="flex items-center justify-end border-r border-gray-300 bg-white p-3"
          style={{ gridColumn: 1, gridRow: '1 / -1' }}
        >
          <Text variant="t2" weight="medium" className="text-gray-900">
            All Day
          </Text>
        </div>
        {days.map((day, index) => (
          <div
            key={index}
            style={{ gridColumn: index + 2, gridRow: '1 / -1' }}
            className={clsx(
              'min-h-10.5 border-gray-300',
              index < dayCount - 1 && 'border-r',
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
                    {days[colIndex] &&
                      new Intl.DateTimeFormat('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }).format(days[colIndex].fullDate)}
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
      <div
        className="grid"
        style={{
          gridTemplateColumns,
          gridAutoRows: `minmax(${HOUR_HEIGHT}px, auto)`,
        }}
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
        {days.map((day, dayIndex) =>
          HOURS.map((hour) => {
            const groupEvents = hourlyGroups.get(`${dayIndex}-${hour}`) ?? [];
            return (
              <TimeGridHourCell
                key={`${dayIndex}-${hour}`}
                day={day}
                hour={hour}
                dayIndex={dayIndex}
                dayCount={dayCount}
                isToday={isToday(day)}
                events={groupEvents}
                showCalendarTooltip={showCalendarTooltip}
                onEventClick={onEventClick}
                onSlotClick={backdropOnClick}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function TimeGridHourCell({
  day,
  hour,
  dayIndex,
  dayCount,
  isToday: today,
  events,
  showCalendarTooltip,
  onEventClick,
  onSlotClick,
}: {
  day: CalendarDay;
  hour: number;
  dayIndex: number;
  dayCount: number;
  isToday: boolean;
  events: CalendarEvent[];
  showCalendarTooltip?: boolean;
  onEventClick?: (event?: CalendarEvent) => void;
  onSlotClick?: (day?: CalendarDay) => void;
}) {
  const slotDate = new Date(day.fullDate);
  slotDate.setHours(hour, 0, 0, 0);

  const visibleEvents = events.slice(0, MAX_VISIBLE_TIMED_EVENTS);
  const hiddenEvents = events.slice(MAX_VISIBLE_TIMED_EVENTS);

  return (
    <div
      style={{ gridColumn: dayIndex + 2, gridRow: hour + 1 }}
      className={clsx(
        'group relative flex flex-col gap-0.5 border-b border-gray-300 p-1',
        dayIndex < dayCount - 1 && 'border-r',
        today ? 'bg-gray-50' : 'bg-white'
      )}
    >
      {onSlotClick && (
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
      )}

      {onSlotClick && visibleEvents.length === 0 && (
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
      )}

      {visibleEvents.map((event, index) => (
        <div key={index} className="relative z-10">
          <TimedEventBlock
            event={event}
            showTooltip={showCalendarTooltip}
            onClick={() => onEventClick?.(event)}
          />
        </div>
      ))}

      {hiddenEvents.length > 0 && (
        <Dropdown>
          <DropdownTrigger className="relative z-10 w-full" asChild>
            <div>
              <ButtonMore count={hiddenEvents.length} />
            </div>
          </DropdownTrigger>
          <DropdownContent
            sideOffset={-130}
            className="z-10 min-w-45 transform"
          >
            <Text variant="t2" weight="semibold" className="text-gray-800">
              {new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(day.fullDate)}
            </Text>
            <div className="max-h-64 max-w-64 overflow-x-hidden overflow-y-auto">
              {hiddenEvents.map((event, index) => (
                <TimedEventBlock
                  key={index}
                  event={event}
                  showTooltip={showCalendarTooltip}
                  onClick={() => onEventClick?.(event)}
                />
              ))}
            </div>
          </DropdownContent>
        </Dropdown>
      )}
    </div>
  );
}
