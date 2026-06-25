import clsx from 'clsx';
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  useIsMobile,
} from '../../../clients';
import { Text } from '../../text';
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

        const sortedSegments = [...segments].sort(
          (a, b) => a.startCol - b.startCol || b.span - a.span
        );

        const segmentLevels = new Map<(typeof segments)[number], number>();

        sortedSegments.forEach((seg) => {
          let placed = false;

          for (let level = 0; level < threshold; level++) {
            const conflict = sortedSegments.some((other) => {
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

        const columnLevelOccupied = Array.from(
          { length: 7 },
          () => new Array(threshold).fill(false) as boolean[]
        );

        segments.forEach((seg) => {
          const level = segmentLevels.get(seg) ?? 0;
          if (level < threshold) {
            for (let i = 0; i < seg.span; i++) {
              const col = seg.startCol + i;
              if (col >= 0 && col < 7) columnLevelOccupied[col][level] = true;
            }
          }
        });

        const renderSegments: ((typeof segments)[number] & {
          level: number;
        })[] = [];

        segments.forEach((seg) => {
          const level = segmentLevels.get(seg) ?? 0;
          if (level < threshold) renderSegments.push({ ...seg, level });
        });

        sortedSegments.forEach((seg) => {
          if ((segmentLevels.get(seg) ?? 0) < threshold) return;

          const segEnd = Math.min(seg.startCol + seg.span - 1, 6);

          let runStart = -1;
          let runLevel = -1;

          const flushRun = (endExclusive: number) => {
            if (runStart !== -1) {
              renderSegments.push({
                event: seg.event,
                startCol: runStart,
                span: endExclusive - runStart,
                level: runLevel,
              });
            }
            runStart = -1;
            runLevel = -1;
          };

          const pickLevel = (col: number): number => {
            let bestLevel = -1;
            let bestRun = 0;
            for (let l = 0; l < threshold; l++) {
              if (columnLevelOccupied[col][l] !== false) continue;
              let run = 0;
              for (let c = col; c <= segEnd; c++) {
                if (columnLevelOccupied[c][l] !== false) break;
                run++;
              }
              if (run > bestRun) {
                bestRun = run;
                bestLevel = l;
              }
            }
            return bestLevel;
          };

          for (let i = 0; i < seg.span; i++) {
            const col = seg.startCol + i;
            if (col < 0 || col >= 7) {
              flushRun(col);
              continue;
            }

            if (runLevel !== -1) {
              if (columnLevelOccupied[col][runLevel] === false) {
                columnLevelOccupied[col][runLevel] = true;
              } else {
                flushRun(col);
                const availableLevel = pickLevel(col);
                if (availableLevel !== -1) {
                  runStart = col;
                  runLevel = availableLevel;
                  columnLevelOccupied[col][availableLevel] = true;
                }
              }
            } else {
              const availableLevel = pickLevel(col);
              if (availableLevel !== -1) {
                runStart = col;
                runLevel = availableLevel;
                columnLevelOccupied[col][availableLevel] = true;
              }
            }
          }
          flushRun(seg.startCol + seg.span);
        });

        const columnHiddenSegments = Array.from(
          { length: 7 },
          () => [] as typeof segments
        );

        segments.forEach((seg) => {
          if ((segmentLevels.get(seg) ?? 0) < threshold) return;
          for (let i = 0; i < seg.span; i++) {
            const col = seg.startCol + i;
            if (col < 0 || col >= 7) continue;
            const rendered = renderSegments.some(
              (rs) =>
                rs.event === seg.event &&
                rs.startCol <= col &&
                col < rs.startCol + rs.span
            );
            if (!rendered) columnHiddenSegments[col].push(seg);
          }
        });

        const columnMoreCount = columnHiddenSegments.map((segs) => segs.length);

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
                {(useLimitEvent
                  ? renderSegments
                  : segments.map((s) => ({
                      ...s,
                      level: segmentLevels.get(s) ?? 0,
                    }))
                ).map(({ level, ...seg }, index) => (
                  <EventBar
                    key={index}
                    segment={seg}
                    level={level}
                    showTooltip={showCalendarTooltip}
                    onClick={() => onEventClick?.(seg.event)}
                  />
                ))}
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
                                  level={segmentLevels.get(seg) ?? 0}
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
