import clsx from 'clsx';
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  useIsMobile,
} from '../../../clients';
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
  backdropOnClick,
  onEventClick,
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
        const displayLimit = 1;

        const segmentLevels = new Map<(typeof segments)[number], number>();

        segments.forEach((seg) => {
          let placed = false;

          for (let level = 0; level < threshold; level++) {
            const conflict = segments.some((other) => {
              if (other === seg) return false;

              const otherLevel = segmentLevels.get(other);
              if (otherLevel !== level) return false;

              const segStart = seg.startCol;
              const segEnd = seg.startCol + seg.span - 1;

              const otherStart = other.startCol;
              const otherEnd = other.startCol + other.span - 1;

              return !(segEnd < otherStart || segStart > otherEnd);
            });

            if (!conflict) {
              segmentLevels.set(seg, level);
              placed = true;
              break;
            }
          }

          if (!placed) {
            segmentLevels.set(seg, threshold);
          }
        });

        const columnHiddenCount = Array(7).fill(0);

        segments.forEach((seg) => {
          const level = segmentLevels.get(seg) ?? 0;

          if (level >= threshold) {
            for (let i = 0; i < seg.span; i++) {
              const col = seg.startCol + i;
              if (col >= 0 && col < 7) {
                columnHiddenCount[col]++;
              }
            }
          }
        });

        const hasOverflow = segments.length > threshold;

        const visibleSegments = segments.filter((seg) => {
          const level = segmentLevels.get(seg) ?? 0;

          if (!hasOverflow) {
            return level < threshold;
          }

          return level < displayLimit;
        });

        const columnHiddenSegments = Array.from(
          { length: 7 },
          () => [] as typeof segments
        );

        segments.forEach((seg) => {
          const isVisible = visibleSegments.includes(seg);

          if (!isVisible) {
            for (let i = 0; i < seg.span; i++) {
              const col = seg.startCol + i;
              if (col >= 0 && col < 7) {
                columnHiddenSegments[col].push(seg);
              }
            }
          }
        });

        const columnTotalCount = Array(7).fill(0);

        segments.forEach((seg) => {
          for (let i = 0; i < seg.span; i++) {
            const col = seg.startCol + i;
            if (col >= 0 && col < 7) {
              columnTotalCount[col]++;
            }
          }
        });

        const columnVisibleCount = Array(7).fill(0);

        visibleSegments.forEach((seg) => {
          for (let i = 0; i < seg.span; i++) {
            const col = seg.startCol + i;
            if (col >= 0 && col < 7) {
              columnVisibleCount[col]++;
            }
          }
        });

        const columnMoreCount = columnTotalCount.map((total, i) =>
          Math.max(0, total - columnVisibleCount[i])
        );

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
                />
              ))}
            </div>

            {/* Event bars */}
            {segments.length > 0 && (
              <div className="absolute inset-x-0 bottom-2 grid grid-cols-7 gap-0.5">
                {visibleSegments.map((seg, index) => (
                  <EventBar
                    key={index}
                    segment={seg}
                    showTooltip={showCalendarTooltip}
                    onClick={() => onEventClick?.(seg.event)}
                  />
                ))}
                {columnMoreCount.map((count, colIndex) =>
                  count > 0 ? (
                    <Dropdown key={colIndex}>
                      <DropdownTrigger className="w-full" asChild>
                        <div style={{ gridColumnStart: colIndex + 1 }}>
                          <ButtonMore key={colIndex} count={count} />
                        </div>
                      </DropdownTrigger>
                      <DropdownContent sideOffset={-100}>
                        {columnHiddenSegments[colIndex].map((seg, index) => (
                          <EventBar
                            key={index}
                            segment={seg}
                            showTooltip={showCalendarTooltip}
                            onClick={() => onEventClick?.(seg.event)}
                          />
                        ))}
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
